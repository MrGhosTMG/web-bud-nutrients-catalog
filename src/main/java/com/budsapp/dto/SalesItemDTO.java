package com.budsapp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SalesItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String manufacturer;
    private String category;
    private Double catalogPrice;
    private Double salePrice;
    private String photo;
}
