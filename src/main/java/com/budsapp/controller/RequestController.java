package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.ProductRequestDTO;
import com.budsapp.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductRequestDTO>>> getAllRequests() {
        return ResponseEntity.ok(ApiResponse.ok(requestService.getAllRequests()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ProductRequestDTO>>> getUserRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(requestService.getUserRequests(userId)));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<ProductRequestDTO>> createRequest(
            @PathVariable Long userId,
            @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Request created", requestService.createRequest(userId, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.ok(ApiResponse.ok("Request deleted", null));
    }
}
