package com.astraflow.project.dto.request;

import com.astraflow.project.model.enums.PlanType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanRequest {

    private UUID tenantId;
    private String name;
    private BigDecimal price;
    private PlanType planType;
    private Integer durationDays;
    private Integer maxConnections;
    private Boolean isActive;
    private List<String> features;
	public UUID getTenantId() {
		return tenantId;
	}
	public void setTenantId(UUID tenantId) {
		this.tenantId = tenantId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public PlanType getPlanType() {
		return planType;
	}
	public void setPlanType(PlanType planType) {
		this.planType = planType;
	}
	public Integer getDurationDays() {
		return durationDays;
	}
	public void setDurationDays(Integer durationDays) {
		this.durationDays = durationDays;
	}
	public Integer getMaxConnections() {
		return maxConnections;
	}
	public void setMaxConnections(Integer maxConnections) {
		this.maxConnections = maxConnections;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public List<String> getFeatures() {
		return features;
	}
	public void setFeatures(List<String> features) {
		this.features = features;
	}
    
    
}
