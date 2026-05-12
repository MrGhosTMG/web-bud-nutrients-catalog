package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.OfferItemDTO;
import com.budsapp.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OfferItemDTO>>> getAllOffers() {
        return ResponseEntity.ok(ApiResponse.ok(offerService.getAllOffers()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<OfferItemDTO>> addOffer(
            @PathVariable Long productId,
            @RequestParam String offerType,
            @RequestParam(required = false) String offerDescription,
            @RequestParam(required = false) Long bundleWith) {
        return ResponseEntity.ok(ApiResponse.ok("Offer added",
                offerService.addOffer(productId, offerType, offerDescription, bundleWith)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OfferItemDTO>> updateOffer(
            @PathVariable Long id,
            @RequestParam(required = false) String offerType,
            @RequestParam(required = false) String offerDescription,
            @RequestParam(required = false) Long bundleWith) {
        return ResponseEntity.ok(ApiResponse.ok("Offer updated",
                offerService.updateOffer(id, offerType, offerDescription, bundleWith)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> removeOffer(@PathVariable Long id) {
        offerService.removeFromOffers(id);
        return ResponseEntity.ok(ApiResponse.ok("Offer removed", null));
    }
}
