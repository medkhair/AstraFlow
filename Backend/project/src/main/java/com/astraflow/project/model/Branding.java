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

    @Column(length = 500)
    private String logoUrl;

    @Column(length = 20)
    private String primaryColor;

    @Column(length = 20)
    private String secondaryColor;

    @Column(columnDefinition = "TEXT")
    private String customCss;
}
