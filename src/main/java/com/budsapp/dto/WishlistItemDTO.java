package com.budsapp.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String manufacturer;
    private String category;
    private Double catalogPrice;
    private String photo;
    private String description;
    private Boolean isDone;
    private LocalDateTime addedDate;
}
