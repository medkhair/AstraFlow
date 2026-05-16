package com.astraflow.project.dto;

import java.util.List;

public class M3uImportResult {

    private int totalParsed;
    private int imported;
    private int skippedDuplicates;
    private int skippedInvalidUrl;
    private int skippedBlankName;
    private List<String> errors;

    private M3uImportResult() {}

    public int getTotalParsed() { return totalParsed; }
    public int getImported() { return imported; }
    public int getSkippedDuplicates() { return skippedDuplicates; }
    public int getSkippedInvalidUrl() { return skippedInvalidUrl; }
    public int getSkippedBlankName() { return skippedBlankName; }
    public List<String> getErrors() { return errors; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private int totalParsed;
        private int imported;
        private int skippedDuplicates;
        private int skippedInvalidUrl;
        private int skippedBlankName;
        private List<String> errors;

        private Builder() {}

        public Builder totalParsed(int totalParsed) {
            this.totalParsed = totalParsed;
            return this;
        }

        public Builder imported(int imported) {
            this.imported = imported;
            return this;
        }

        public Builder skippedDuplicates(int skippedDuplicates) {
            this.skippedDuplicates = skippedDuplicates;
            return this;
        }

        public Builder skippedInvalidUrl(int skippedInvalidUrl) {
            this.skippedInvalidUrl = skippedInvalidUrl;
            return this;
        }

        public Builder skippedBlankName(int skippedBlankName) {
            this.skippedBlankName = skippedBlankName;
            return this;
        }

        public Builder errors(List<String> errors) {
            this.errors = errors;
            return this;
        }

        public M3uImportResult build() {
            M3uImportResult result = new M3uImportResult();
            result.totalParsed = this.totalParsed;
            result.imported = this.imported;
            result.skippedDuplicates = this.skippedDuplicates;
            result.skippedInvalidUrl = this.skippedInvalidUrl;
            result.skippedBlankName = this.skippedBlankName;
            result.errors = this.errors;
            return result;
        }
    }
}