package com.budsapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CurrencyDTO {
    @NotBlank
    private String code;

    @NotBlank
    private String name;

    @NotBlank
    private String symbol;

    @Positive
    private Double rateToUSD;
}
