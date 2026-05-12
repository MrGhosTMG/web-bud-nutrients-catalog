package com.budsapp.repository;

import com.budsapp.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(String type);
    List<Transaction> findByProductId(Long productId);
    List<Transaction> findByProductIdAndType(Long productId, String type);

    @Query("SELECT t FROM Transaction t WHERE t.transactionDate BETWEEN :from AND :to ORDER BY t.transactionDate")
    List<Transaction> findByDateRange(@Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT t FROM Transaction t WHERE t.type = :type AND t.transactionDate BETWEEN :from AND :to")
    List<Transaction> findByTypeAndDateRange(@Param("type") String type,
                                             @Param("from") LocalDate from,
                                             @Param("to") LocalDate to);

    @Query("SELECT COALESCE(SUM(t.totalAmount), 0) FROM Transaction t WHERE t.type = :type")
    Double sumTotalByType(@Param("type") String type);

    @Query("SELECT COALESCE(SUM(t.totalAmount), 0) FROM Transaction t WHERE t.type = :type AND t.transactionDate BETWEEN :from AND :to")
    Double sumTotalByTypeAndDateRange(@Param("type") String type,
                                     @Param("from") LocalDate from,
                                     @Param("to") LocalDate to);
}
