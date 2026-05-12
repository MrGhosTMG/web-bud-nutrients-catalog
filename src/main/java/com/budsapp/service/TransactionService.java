package com.budsapp.service;

import com.budsapp.dto.TransactionDTO;
import com.budsapp.dto.WinLossSummaryDTO;
import com.budsapp.entity.Product;
import com.budsapp.entity.Transaction;
import com.budsapp.entity.User;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.ProductRepository;
import com.budsapp.repository.TransactionRepository;
import com.budsapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<TransactionDTO> getTransactionsByType(String type) {
        return transactionRepository.findByType(type).stream().map(this::toDTO).toList();
    }

    public List<TransactionDTO> getTransactionsByProduct(Long productId) {
        return transactionRepository.findByProductId(productId).stream().map(this::toDTO).toList();
    }

    public List<TransactionDTO> getTransactionsByDateRange(LocalDate from, LocalDate to) {
        return transactionRepository.findByDateRange(from, to).stream().map(this::toDTO).toList();
    }

    public TransactionDTO createTransaction(TransactionDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Transaction.TransactionBuilder builder = Transaction.builder()
                .product(product)
                .type(dto.getType())
                .quantity(dto.getQuantity())
                .unitPrice(dto.getUnitPrice())
                .totalAmount(dto.getQuantity() * dto.getUnitPrice())
                .transactionDate(dto.getTransactionDate() != null ? dto.getTransactionDate() : LocalDate.now())
                .notes(dto.getNotes());

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            builder.user(user);
        }

        return toDTO(transactionRepository.save(builder.build()));
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public WinLossSummaryDTO getSummary(LocalDate from, LocalDate to) {
        if (from == null) from = LocalDate.now().minusMonths(1);
        if (to == null) to = LocalDate.now();

        Double purchaseCost = transactionRepository.sumTotalByTypeAndDateRange("PURCHASE", from, to);
        Double salesRevenue = transactionRepository.sumTotalByTypeAndDateRange("SALE", from, to);

        if (purchaseCost == null) purchaseCost = 0.0;
        if (salesRevenue == null) salesRevenue = 0.0;

        int purchaseCount = transactionRepository.findByTypeAndDateRange("PURCHASE", from, to).size();
        int saleCount = transactionRepository.findByTypeAndDateRange("SALE", from, to).size();

        double profit = salesRevenue - purchaseCost;
        double margin = salesRevenue > 0 ? (profit / salesRevenue) * 100 : 0;

        return WinLossSummaryDTO.builder()
                .dateFrom(from)
                .dateTo(to)
                .totalPurchases(purchaseCount)
                .totalSales(saleCount)
                .totalPurchaseCost(Math.round(purchaseCost * 100.0) / 100.0)
                .totalSalesRevenue(Math.round(salesRevenue * 100.0) / 100.0)
                .grossProfit(Math.round(profit * 100.0) / 100.0)
                .profitMargin(Math.round(margin * 100.0) / 100.0)
                .build();
    }

    private TransactionDTO toDTO(Transaction t) {
        return TransactionDTO.builder()
                .id(t.getId())
                .productId(t.getProduct().getId())
                .productName(t.getProduct().getName())
                .manufacturer(t.getProduct().getManufacturer())
                .category(t.getProduct().getCategory())
                .type(t.getType())
                .quantity(t.getQuantity())
                .unitPrice(t.getUnitPrice())
                .totalAmount(t.getTotalAmount())
                .transactionDate(t.getTransactionDate())
                .notes(t.getNotes())
                .userId(t.getUser() != null ? t.getUser().getId() : null)
                .userName(t.getUser() != null ? t.getUser().getFullName() : null)
                .build();
    }
}
