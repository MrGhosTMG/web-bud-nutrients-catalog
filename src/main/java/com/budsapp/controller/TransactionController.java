package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.TransactionDTO;
import com.budsapp.dto.WinLossSummaryDTO;
import com.budsapp.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(transactionService.getAllTransactions()));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(ApiResponse.ok(transactionService.getTransactionsByType(type)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.ok(transactionService.getTransactionsByProduct(productId)));
    }

    @GetMapping("/range")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.ok(transactionService.getTransactionsByDateRange(from, to)));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<WinLossSummaryDTO>> getSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.ok(transactionService.getSummary(from, to)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TransactionDTO>> create(@RequestBody TransactionDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Transaction created", transactionService.createTransaction(dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok(ApiResponse.ok("Transaction deleted", null));
    }
}
