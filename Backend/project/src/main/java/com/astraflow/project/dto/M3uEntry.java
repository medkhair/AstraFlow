package com.astraflow.project.dto;

public class M3uEntry {

    private String name;
    private String streamUrl;
    private String logoUrl;
    private String groupTitle;
    private Integer channelNumber;

    private M3uEntry() {}

    public String getName() { return name; }
    public String getStreamUrl() { return streamUrl; }
    public String getLogoUrl() { return logoUrl; }
    public String getGroupTitle() { return groupTitle; }
    public Integer getChannelNumber() { return channelNumber; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String name;
        private String streamUrl;
        private String logoUrl;
        private String groupTitle;
        private Integer channelNumber;

        private Builder() {}

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder streamUrl(String streamUrl) {
            this.streamUrl = streamUrl;
            return this;
        }

        public Builder logoUrl(String logoUrl) {
            this.logoUrl = logoUrl;
            return this;
        }

        public Builder groupTitle(String groupTitle) {
            this.groupTitle = groupTitle;
            return this;
        }

        public Builder channelNumber(Integer channelNumber) {
            this.channelNumber = channelNumber;
            return this;
        }

        public M3uEntry build() {
            M3uEntry entry = new M3uEntry();
            entry.name = this.name;
            entry.streamUrl = this.streamUrl;
            entry.logoUrl = this.logoUrl;
            entry.groupTitle = this.groupTitle;
            entry.channelNumber = this.channelNumber;
            return entry;
        }
    }
}