package com.budsapp.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductRequestDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String productName;
    private String category;
    private String manufacturer;
    private String photo;
    private String link;
    private String notes;
    private LocalDate dateAdded;
    private String status;
}
