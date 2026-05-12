package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.ProductDTO;
import com.budsapp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
        return ResponseEntity.ok(ApiResponse.ok(productService.getAllProducts()));
    }

    @GetMapping("/public/available")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAvailableProducts() {
        return ResponseEntity.ok(ApiResponse.ok(productService.getAvailableProducts()));
    }

    @GetMapping("/by-source/{sourceType}")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getBySource(@PathVariable String sourceType) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getProductsBySourceType(sourceType)));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getOrderedProducts() {
        return ResponseEntity.ok(ApiResponse.ok(productService.getOrderedProducts()));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> search(@RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.ok(productService.search(q)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getProductById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@RequestBody ProductDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Product created", productService.createProduct(dto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Product updated", productService.updateProduct(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.ok("Product deleted", null));
    }
}
