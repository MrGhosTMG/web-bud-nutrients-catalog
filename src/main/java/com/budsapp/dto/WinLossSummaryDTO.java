package com.budsapp.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WinLossSummaryDTO {
    private LocalDate dateFrom;
    private LocalDate dateTo;

    @Builder.Default
    private int totalPurchases = 0;
    @Builder.Default
    private int totalSales = 0;
    @Builder.Default
    private double totalPurchaseCost = 0.0;
    @Builder.Default
    private double totalSalesRevenue = 0.0;
    @Builder.Default
    private double grossProfit = 0.0;
    @Builder.Default
    private double profitMargin = 0.0;
}
