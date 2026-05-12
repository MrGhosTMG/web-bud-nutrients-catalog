package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.WishlistItemDTO;
import com.budsapp.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<WishlistItemDTO>>> getUserWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(wishlistService.getUserWishlist(userId)));
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<ApiResponse<WishlistItemDTO>> addToWishlist(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.ok("Added to wishlist",
                wishlistService.addToWishlist(userId, productId)));
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok(ApiResponse.ok("Removed from wishlist", null));
    }

    @PatchMapping("/{id}/toggle-done")
    public ResponseEntity<ApiResponse<Void>> toggleDone(@PathVariable Long id) {
        wishlistService.toggleDone(id);
        return ResponseEntity.ok(ApiResponse.ok("Toggled", null));
    }
}
