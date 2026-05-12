package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "products")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 100)
    private String manufacturer;

    @Column(length = 100)
    private String category;

    @Column(name = "my_price")
    private Double myPrice;

    @Column(name = "catalog_price", nullable = false)
    private Double catalogPrice;

    private Integer quantity;

    @Column(columnDefinition = "TEXT")
    private String photo;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_available")
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(name = "order_status", length = 20)
    private String orderStatus;

    @Column(name = "source_type", length = 20)
    private String sourceType;

    @Column(name = "in_stock")
    private Boolean inStock;

    @Column(name = "sold_quantity")
    @Builder.Default
    private Integer soldQuantity = 0;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "for_sale")
    @Builder.Default
    private Boolean forSale = false;

    @Column(name = "actual_sold_price")
    private Double actualSoldPrice;

    @Column(name = "added_date")
    @Builder.Default
    private LocalDate addedDate = LocalDate.now();
}
