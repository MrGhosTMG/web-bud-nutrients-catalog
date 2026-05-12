package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.SalesItemDTO;
import com.budsapp.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SalesItemDTO>>> getAllSales() {
        return ResponseEntity.ok(ApiResponse.ok(salesService.getAllSalesItems()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<SalesItemDTO>> addToSales(
            @PathVariable Long productId,
            @RequestParam Double salePrice) {
        return ResponseEntity.ok(ApiResponse.ok("Added to sales", salesService.addToSales(productId, salePrice)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> removeFromSales(@PathVariable Long id) {
        salesService.removeFromSales(id);
        return ResponseEntity.ok(ApiResponse.ok("Removed from sales", null));
    }
}
