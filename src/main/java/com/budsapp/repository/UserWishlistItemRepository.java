package com.budsapp.repository;

import com.budsapp.entity.UserWishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserWishlistItemRepository extends JpaRepository<UserWishlistItem, Long> {
    List<UserWishlistItem> findByUserId(Long userId);
    Optional<UserWishlistItem> findByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
    List<UserWishlistItem> findByProductId(Long productId);
}
