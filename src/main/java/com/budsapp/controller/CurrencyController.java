package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.CurrencyDTO;
import com.budsapp.entity.Currency;
import com.budsapp.service.CurrencyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currencies")
@RequiredArgsConstructor
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Currency>>> getAllCurrencies() {
        return ResponseEntity.ok(ApiResponse.ok(currencyService.getAllCurrencies()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Currency>> addCurrency(@Valid @RequestBody CurrencyDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Currency added", currencyService.addCurrency(dto)));
    }

    @PutMapping("/{code}")
    public ResponseEntity<ApiResponse<Currency>> updateRate(
            @PathVariable String code,
            @RequestParam Double rate) {
        return ResponseEntity.ok(ApiResponse.ok("Rate updated", currencyService.updateRate(code, rate)));
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> deleteCurrency(@PathVariable String code) {
        currencyService.deleteCurrency(code);
        return ResponseEntity.ok(ApiResponse.ok("Currency deleted", null));
    }
}
