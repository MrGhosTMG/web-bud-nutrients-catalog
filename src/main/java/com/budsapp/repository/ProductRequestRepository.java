package com.budsapp.repository;

import com.budsapp.entity.ProductRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRequestRepository extends JpaRepository<ProductRequest, Long> {
    List<ProductRequest> findByUserId(Long userId);
    List<ProductRequest> findByStatus(String status);
}
