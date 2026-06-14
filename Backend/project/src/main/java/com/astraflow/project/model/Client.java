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

        @Column(name= "stripe_customer_id", unique = true)
        private String stripeCustomerId;

        @Column(name="stripe_payment_method_id", unique = true)
        private String stripePaymentMethodId;

        public Tenant getTenant() {
                return tenant;
        }

        public void setTenant(Tenant tenant) {
                this.tenant = tenant;
        }

        public String getStripeCustomerId() {
                return stripeCustomerId;
        }

        public void setStripeCustomerId(String stripeCustomerId) {
                this.stripeCustomerId = stripeCustomerId;
        }

        public String getStripePaymentMethodId() {
                return stripePaymentMethodId;
        }

        public void setStripePaymentMethodId(String stripePaymentMethodId) {
                this.stripePaymentMethodId = stripePaymentMethodId;
        }

	
	
    
}
