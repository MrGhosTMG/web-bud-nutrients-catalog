package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "offer_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OfferItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "offer_type", length = 30)
    private String offerType;

    @Column(name = "offer_description", columnDefinition = "TEXT")
    private String offerDescription;

    @Column(name = "bundle_with")
    private Long bundleWith;
}
