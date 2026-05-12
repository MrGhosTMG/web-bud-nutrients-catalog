package com.budsapp.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String manufacturer;
    private String category;
    private Double myPrice;
    private Double catalogPrice;
    private Integer quantity;
    private String photo;
    private String description;
    private Boolean isAvailable;
    private String orderStatus;
    private String sourceType;
    private Boolean inStock;
    private Integer soldQuantity;
    private LocalDate expiryDate;
    private LocalDate orderDate;
    private Boolean forSale;
    private Double actualSoldPrice;
    private LocalDate addedDate;
}
