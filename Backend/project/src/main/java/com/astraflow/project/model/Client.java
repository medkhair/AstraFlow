package com.astraflow.project.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "clients",
        indexes = {
                @Index(name = "idx_client_tenant", columnList = "tenant_id")
        }
)
@DiscriminatorValue("CLIENT")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Client extends User {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;
}
