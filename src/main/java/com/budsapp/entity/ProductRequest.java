package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "product_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String manufacturer;

    @Column(columnDefinition = "TEXT")
    private String photo;

    @Column(length = 500)
    private String link;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "date_added")
    @Builder.Default
    private LocalDate dateAdded = LocalDate.now();

    @Column(length = 20)
    @Builder.Default
    private String status = "pending";
}
