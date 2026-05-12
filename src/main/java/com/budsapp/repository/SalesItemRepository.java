package com.budsapp.repository;

import com.budsapp.entity.SalesItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SalesItemRepository extends JpaRepository<SalesItem, Long> {
    Optional<SalesItem> findByProductId(Long productId);
    void deleteByProductId(Long productId);
}
