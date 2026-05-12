package com.budsapp.repository;

import com.budsapp.entity.OfferItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OfferItemRepository extends JpaRepository<OfferItem, Long> {
    Optional<OfferItem> findByProductId(Long productId);
    void deleteByProductId(Long productId);
}
