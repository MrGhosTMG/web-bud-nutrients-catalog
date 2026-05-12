package com.budsapp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OfferItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String manufacturer;
    private String category;
    private Double catalogPrice;
    private String offerType;
    private String offerDescription;
    private Long bundleWith;
    private String photo;
}
