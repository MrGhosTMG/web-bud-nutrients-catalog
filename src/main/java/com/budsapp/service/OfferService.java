package com.budsapp.service;

import com.budsapp.dto.OfferItemDTO;
import com.budsapp.entity.OfferItem;
import com.budsapp.entity.Product;
import com.budsapp.exception.BadRequestException;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.OfferItemRepository;
import com.budsapp.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferItemRepository offerItemRepository;
    private final ProductRepository productRepository;

    public List<OfferItemDTO> getAllOffers() {
        return offerItemRepository.findAll().stream().map(this::toDTO).toList();
    }

    public OfferItemDTO addOffer(Long productId, String offerType, String offerDescription, Long bundleWith) {
        if (offerItemRepository.findByProductId(productId).isPresent()) {
            throw new BadRequestException("Product already in offers list");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        OfferItem item = OfferItem.builder()
                .product(product)
                .offerType(offerType)
                .offerDescription(offerDescription)
                .bundleWith(bundleWith)
                .build();
        return toDTO(offerItemRepository.save(item));
    }

    public OfferItemDTO updateOffer(Long id, String offerType, String offerDescription, Long bundleWith) {
        OfferItem item = offerItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
        if (offerType != null) item.setOfferType(offerType);
        if (offerDescription != null) item.setOfferDescription(offerDescription);
        if (bundleWith != null) item.setBundleWith(bundleWith);
        return toDTO(offerItemRepository.save(item));
    }

    public void removeFromOffers(Long id) {
        offerItemRepository.deleteById(id);
    }

    public void removeByProductId(Long productId) {
        offerItemRepository.deleteByProductId(productId);
    }

    private OfferItemDTO toDTO(OfferItem item) {
        Product p = item.getProduct();
        return OfferItemDTO.builder()
                .id(item.getId())
                .productId(p.getId())
                .productName(p.getName())
                .manufacturer(p.getManufacturer())
                .category(p.getCategory())
                .catalogPrice(p.getCatalogPrice())
                .offerType(item.getOfferType())
                .offerDescription(item.getOfferDescription())
                .bundleWith(item.getBundleWith())
                .photo(p.getPhoto())
                .build();
    }
}
