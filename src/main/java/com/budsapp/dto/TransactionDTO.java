package com.budsapp.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TransactionDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String manufacturer;
    private String category;
    private String type;
    private Integer quantity;
    private Double unitPrice;
    private Double totalAmount;
    private LocalDate transactionDate;
    private String notes;
    private Long userId;
    private String userName;
}
