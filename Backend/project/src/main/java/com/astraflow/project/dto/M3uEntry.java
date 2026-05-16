package com.astraflow.project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class M3uEntry {
    private String name;
    private String streamUrl;
    private String logoUrl;
    private String groupTitle;
    private Integer channelNumber;
}