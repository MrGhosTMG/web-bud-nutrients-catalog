package com.budsapp.repository;

import com.budsapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySourceType(String sourceType);
    List<Product> findByOrderStatusIsNotNull();
    List<Product> findByIsAvailableTrue();
    List<Product> findByManufacturer(String manufacturer);
    List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:term% OR p.manufacturer LIKE %:term% OR p.category LIKE %:term%")
    List<Product> search(@Param("term") String term);
}
