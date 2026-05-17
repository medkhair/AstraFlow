package com.astraflow.project.service;

import com.astraflow.project.model.Channel;
import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.ChannelStatus;
import com.astraflow.project.dto.M3uEntry;
import com.astraflow.project.dto.M3uImportResult;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.web.multipart.MultipartFile;

@Service
public class M3uImportService {

    private static final int    CONNECT_TIMEOUT_MS = 10_000;
    private static final int    READ_TIMEOUT_MS    = 30_000;
    private static final int    MAX_PLAYLIST_BYTES = 50 * 1024 * 1024; // 50 MB

    private static final Pattern TVG_NAME_PATTERN    = Pattern.compile("tvg-name=\"([^\"]*)\"");
    private static final Pattern TVG_LOGO_PATTERN    = Pattern.compile("tvg-logo=\"([^\"]*)\"");
    private static final Pattern GROUP_TITLE_PATTERN = Pattern.compile("group-title=\"([^\"]*)\"");
    private static final Pattern CHANNEL_NO_PATTERN  = Pattern.compile("tvg-chno=\"([^\"]*)\"");
    private static final Pattern URL_PATTERN         = Pattern.compile(
            "^https?://[\\w\\-.]+(:\\d+)?(/[\\w\\-./?%&=+#]*)?$",
            Pattern.CASE_INSENSITIVE
    );

    @Autowired
    private ChannelService channelService;

    @Autowired
    private ChannelCategoryService channelCategoryService;

    @Autowired
    private TenantService tenantService;

    // -------------------------------------------------------------------------
    // Public entry point
    // -------------------------------------------------------------------------

    @Transactional
    public M3uImportResult importFromUrl(String playlistUrl, UUID tenantId) {
        Tenant tenant = tenantService.findById(tenantId)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found: " + tenantId));

        String rawContent = downloadPlaylist(playlistUrl);
        List<M3uEntry> entries = parseEntries(rawContent);
        return persistEntries(entries, tenant);
    }

    @Transactional
    public M3uImportResult importFromFile(MultipartFile file, UUID tenantId) {
        Tenant tenant = tenantService.findById(tenantId)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found: " + tenantId));

        String rawContent = readUploadedFile(file);
        List<M3uEntry> entries = parseEntries(rawContent);
        return persistEntries(entries, tenant);
    }

    // -------------------------------------------------------------------------
    // Step 1 — Download
    // -------------------------------------------------------------------------

    String downloadPlaylist(String playlistUrl) {
        validateStreamUrl(playlistUrl);

        try {
            URL url = URI.create(playlistUrl).toURL();
            URLConnection connection = url.openConnection();
            connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
            connection.setReadTimeout(READ_TIMEOUT_MS);
            connection.setRequestProperty("User-Agent", "AstraFlow/1.0");

            StringBuilder sb = new StringBuilder();
            int totalBytes = 0;

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    totalBytes += line.length();
                    if (totalBytes > MAX_PLAYLIST_BYTES) {
                        throw new IllegalStateException("Playlist exceeds maximum allowed size of 50 MB");
                    }
                    sb.append(line).append('\n');
                }
            }
            return sb.toString();

        } catch (IOException e) {
            throw new IllegalArgumentException("Failed to download playlist from: " + playlistUrl, e);
        }
    }

    // -------------------------------------------------------------------------
    // Step 2 — Parse
    // -------------------------------------------------------------------------

    List<M3uEntry> parseEntries(String content) {
        List<M3uEntry> entries = new ArrayList<>();

        if (content == null || !content.trim().startsWith("#EXTM3U")) {
            throw new IllegalArgumentException("Content is not a valid M3U playlist (missing #EXTM3U header)");
        }

        String[] lines = content.split("\n");
        String currentExtInf = null;

        for (String raw : lines) {
            String line = raw.trim();
            if (line.startsWith("#EXTINF:")) {
                currentExtInf = line;
            } else if (currentExtInf != null && !line.isEmpty() && !line.startsWith("#")) {
                entries.add(buildEntry(currentExtInf, line));
                currentExtInf = null;
            }
        }
        return entries;
    }

    private M3uEntry buildEntry(String extInfLine, String streamUrl) {
        String name         = extractAttribute(TVG_NAME_PATTERN, extInfLine);
        String logoUrl      = extractAttribute(TVG_LOGO_PATTERN, extInfLine);
        String groupTitle   = extractAttribute(GROUP_TITLE_PATTERN, extInfLine);
        String channelNoStr = extractAttribute(CHANNEL_NO_PATTERN, extInfLine);

        if (name == null || name.isBlank()) {
            int commaIdx = extInfLine.lastIndexOf(',');
            if (commaIdx >= 0 && commaIdx < extInfLine.length() - 1) {
                name = extInfLine.substring(commaIdx + 1).trim();
            }
        }

        Integer channelNumber = null;
        if (channelNoStr != null && !channelNoStr.isBlank()) {
            try { channelNumber = Integer.parseInt(channelNoStr.trim()); }
            catch (NumberFormatException ignored) { }
        }

        return M3uEntry.builder()
                .name(name)
                .streamUrl(streamUrl)
                .logoUrl(logoUrl)
                .groupTitle(groupTitle)
                .channelNumber(channelNumber)
                .build();
    }

    // -------------------------------------------------------------------------
    // Step 3 — Sanitize
    // -------------------------------------------------------------------------

    private M3uEntry sanitize(M3uEntry entry) {
        String name = entry.getName() == null ? "" : entry.getName()
                .replaceAll("[<>\"'%;()&+]", "")
                .replaceAll("\\s+", " ")
                .trim();

        String streamUrl = entry.getStreamUrl() == null ? "" : entry.getStreamUrl().trim();

        String logoUrl = entry.getLogoUrl() == null ? null : entry.getLogoUrl().trim();
        if (logoUrl != null && logoUrl.isBlank()) logoUrl = null;

        String groupTitle = entry.getGroupTitle() == null ? null : entry.getGroupTitle()
                .replaceAll("[<>\"'%;()&+]", "")
                .replaceAll("\\s+", " ")
                .trim();
        if (groupTitle != null && groupTitle.isBlank()) groupTitle = null;

        return M3uEntry.builder()
                .name(name)
                .streamUrl(streamUrl)
                .logoUrl(logoUrl)
                .groupTitle(groupTitle)
                .channelNumber(entry.getChannelNumber())
                .build();
    }

    // -------------------------------------------------------------------------
    // Step 4 — Validate URL
    // -------------------------------------------------------------------------

    private void validateStreamUrl(String url) {
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("Stream URL must not be blank");
        }
        if (url.length() > 500) {
            throw new IllegalArgumentException("Stream URL exceeds maximum length of 500 characters");
        }
        if (!URL_PATTERN.matcher(url).matches()) {
            throw new IllegalArgumentException("Invalid stream URL: " + url);
        }
    }

    private boolean isValidStreamUrl(String url) {
        if (url == null || url.isBlank() || url.length() > 500) return false;
        return URL_PATTERN.matcher(url).matches();
    }

    // -------------------------------------------------------------------------
    // Step 5 — Deduplicate & persist  (all via service layer)
    // -------------------------------------------------------------------------

    private M3uImportResult persistEntries(List<M3uEntry> rawEntries, Tenant tenant) {
        int skippedDuplicates = 0;
        int skippedInvalidUrl = 0;
        int skippedBlankName  = 0;
        int imported          = 0;
        List<String> errors   = new ArrayList<>();

        // In-batch deduplication (stream URL normalised to lowercase)
        Set<String> seenStreamUrls = new HashSet<>();

        for (M3uEntry raw : rawEntries) {
            try {
                M3uEntry entry = sanitize(raw);

                if (entry.getName() == null || entry.getName().isBlank()) {
                    skippedBlankName++;
                    continue;
                }

                if (!isValidStreamUrl(entry.getStreamUrl())) {
                    skippedInvalidUrl++;
                    continue;
                }

                String normalizedUrl = entry.getStreamUrl().toLowerCase();

                // In-batch duplicate check
                if (!seenStreamUrls.add(normalizedUrl)) {
                    skippedDuplicates++;
                    continue;
                }

                // DB-level duplicate check via ChannelService
                if (channelService.existsByTenantIdAndStreamUrl(tenant.getId(), entry.getStreamUrl())) {
                    skippedDuplicates++;
                    continue;
                }

                // Resolve or create category via ChannelCategoryService
                ChannelCategory category = resolveCategory(entry.getGroupTitle(), tenant);

                Channel channel = Channel.builder()
                        .tenant(tenant)
                        .category(category)
                        .name(entry.getName())
                        .streamUrl(entry.getStreamUrl())
                        .logoUrl(entry.getLogoUrl())
                        .channelNumber(entry.getChannelNumber())
                        .status(ChannelStatus.ACTIVE)
                        .build();

                channelService.save(channel);
                imported++;

            } catch (Exception e) {
                errors.add("Entry '" + raw.getName() + "': " + e.getMessage());
            }
        }

        return M3uImportResult.builder()
                .totalParsed(rawEntries.size())
                .imported(imported)
                .skippedDuplicates(skippedDuplicates)
                .skippedInvalidUrl(skippedInvalidUrl)
                .skippedBlankName(skippedBlankName)
                .errors(errors)
                .build();
    }

    private ChannelCategory resolveCategory(String groupTitle, Tenant tenant) {
        if (groupTitle == null || groupTitle.isBlank()) return null;

        // Look up existing category via ChannelCategoryService
        return channelCategoryService.findByNameAndTenantId(groupTitle, tenant.getId())
                .orElseGet(() -> {
                    int nextOrder = channelCategoryService.findByTenantId(tenant.getId()).size() + 1;

                    ChannelCategory cat = ChannelCategory.builder()
                            .tenant(tenant)
                            .name(groupTitle)
                            .sortOrder(nextOrder)
                            .build();

                    return channelCategoryService.save(cat);
                });
    }

    // -------------------------------------------------------------------------
    // Utility
    // -------------------------------------------------------------------------

    private String extractAttribute(Pattern pattern, String line) {
        Matcher m = pattern.matcher(line);
        return m.find() ? m.group(1) : null;
    }

    private String readUploadedFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file must not be empty");
        }
        String filename = file.getOriginalFilename();
        if (filename != null) {
            String lower = filename.toLowerCase();
            if (!lower.endsWith(".m3u") && !lower.endsWith(".m3u8")) {
                throw new IllegalArgumentException("File must have a .m3u or .m3u8 extension");
            }
        }
        if (file.getSize() > MAX_PLAYLIST_BYTES) {
            throw new IllegalArgumentException("File exceeds maximum allowed size of 50 MB");
        }
        try {
            return new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalArgumentException("Failed to read uploaded file", e);
        }
    }
}