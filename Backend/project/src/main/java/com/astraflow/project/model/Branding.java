package com.astraflow.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "brandings")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Branding {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", unique = true, nullable = false)
    private Tenant tenant;

    @Column
    private String logoUrl;

    @Column(length = 20)
    private String primaryColor;

    @Column(length = 20)
    private String secondaryColor;

	@Column(length = 20)
    private String tercaryColor;

    @Column(length = 20)
    private String quaternaryColor;

	private String titleFontFamily;

	private String bodyFontFamily;

	private String titleFontSizeUrl;

	private String bodyFontSizeUrl;

    @Column(columnDefinition = "TEXT")
    private String customCss;

	@Column(columnDefinition = "TEXT")
    private String customJs;


	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getPrimaryColor() {
		return primaryColor;
	}

	public void setPrimaryColor(String primaryColor) {
		this.primaryColor = primaryColor;
	}

	public String getSecondaryColor() {
		return secondaryColor;
	}

	public void setSecondaryColor(String secondaryColor) {
		this.secondaryColor = secondaryColor;
	}

	public String getCustomCss() {
		return customCss;
	}

	public void setCustomCss(String customCss) {
		this.customCss = customCss;
	}

	public String getTercaryColor() {
		return tercaryColor;
	}

	public void setTercaryColor(String tercaryColor) {
		this.tercaryColor = tercaryColor;
	}

	public String getQuaternaryColor() {
		return quaternaryColor;
	}

	public void setQuaternaryColor(String quaternaryColor) {
		this.quaternaryColor = quaternaryColor;
	}

	public String getTitleFontFamily() {
		return titleFontFamily;
	}

	public void setTitleFontFamily(String titleFontFamily) {
		this.titleFontFamily = titleFontFamily;
	}

	public String getBodyFontFamily() {
		return bodyFontFamily;
	}

	public void setBodyFontFamily(String bodyFontFamily) {
		this.bodyFontFamily = bodyFontFamily;
	}

	public String getTitleFontSizeUrl() {
		return titleFontSizeUrl;
	}

	public void setTitleFontSizeUrl(String titleFontSizeUrl) {
		this.titleFontSizeUrl = titleFontSizeUrl;
	}

	public String getBodyFontSizeUrl() {
		return bodyFontSizeUrl;
	}

	public void setBodyFontSizeUrl(String bodyFontSizeUrl) {
		this.bodyFontSizeUrl = bodyFontSizeUrl;
	}

	public String getCustomJs() {
		return customJs;
	}

	public void setCustomJs(String customJs) {
		this.customJs = customJs;
	}
    
    
}
