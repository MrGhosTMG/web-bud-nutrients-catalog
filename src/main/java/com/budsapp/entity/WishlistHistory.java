package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "wishlist_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "date_sent")
    private LocalDate dateSent;

    @Column(name = "items_json", columnDefinition = "TEXT")
    private String itemsJson;

    @Column(name = "total_price")
    private Double totalPrice;

    @Builder.Default
    private Boolean completed = false;
}
