package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "currencies")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Currency {
    @Id
    @Column(length = 3)
    private String code;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 5)
    private String symbol;

    @Column(name = "rate_to_usd", nullable = false)
    private Double rateToUSD;
}
