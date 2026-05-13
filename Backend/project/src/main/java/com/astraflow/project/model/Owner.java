package com.astraflow.project.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "owners")
@DiscriminatorValue("OWNER")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Owner extends User {

    @Column(length = 255)
    private String companyName;
}
