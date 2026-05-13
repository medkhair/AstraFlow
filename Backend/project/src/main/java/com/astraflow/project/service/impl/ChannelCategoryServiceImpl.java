package com.astraflow.project.service.impl;

import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.repository.ChannelCategoryRepository;
import com.astraflow.project.service.ChannelCategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChannelCategoryServiceImpl implements ChannelCategoryService {

    private final ChannelCategoryRepository channelCategoryRepository;

    @Override
    public List<ChannelCategory> findAll() {
        return channelCategoryRepository.findAll();
    }

    @Override
    public Optional<ChannelCategory> findById(UUID id) {
        return channelCategoryRepository.findById(id);
    }

    @Override
    public List<ChannelCategory> findByTenantId(UUID tenantId) {
        return channelCategoryRepository.findByTenantIdOrderBySortOrderAsc(tenantId);
    }

    @Override
    @Transactional
    public ChannelCategory save(ChannelCategory category) {
        return channelCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public ChannelCategory update(UUID id, ChannelCategory category) {
        channelCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ChannelCategory not found with id: " + id));
        category.setId(id);
        return channelCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        channelCategoryRepository.deleteById(id);
    }
}
