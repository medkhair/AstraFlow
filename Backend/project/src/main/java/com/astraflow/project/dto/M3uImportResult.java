package com.astraflow.project.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class M3uImportResult {
    private int totalParsed;
    private int imported;
    private int skippedDuplicates;
    private int skippedInvalidUrl;
    private int skippedBlankName;
    private List<String> errors;
}