package com.budsapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_wishlist_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserWishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "added_date")
    @Builder.Default
    private LocalDateTime addedDate = LocalDateTime.now();

    @Column(name = "is_done")
    @Builder.Default
    private Boolean isDone = false;
}
