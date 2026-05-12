package com.budsapp.service;

import com.budsapp.dto.SalesItemDTO;
import com.budsapp.entity.Product;
import com.budsapp.entity.SalesItem;
import com.budsapp.exception.BadRequestException;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.ProductRepository;
import com.budsapp.repository.SalesItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final SalesItemRepository salesItemRepository;
    private final ProductRepository productRepository;

    public List<SalesItemDTO> getAllSalesItems() {
        return salesItemRepository.findAll().stream().map(this::toDTO).toList();
    }

    public SalesItemDTO addToSales(Long productId, Double salePrice) {
        if (salesItemRepository.findByProductId(productId).isPresent()) {
            throw new BadRequestException("Product already in sales list");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        SalesItem item = SalesItem.builder()
                .product(product)
                .salePrice(salePrice)
                .build();
        return toDTO(salesItemRepository.save(item));
    }

    public void removeFromSales(Long id) {
        salesItemRepository.deleteById(id);
    }

    public void removeByProductId(Long productId) {
        salesItemRepository.deleteByProductId(productId);
    }

    private SalesItemDTO toDTO(SalesItem item) {
        Product p = item.getProduct();
        return SalesItemDTO.builder()
                .id(item.getId())
                .productId(p.getId())
                .productName(p.getName())
                .manufacturer(p.getManufacturer())
                .category(p.getCategory())
                .catalogPrice(p.getCatalogPrice())
                .salePrice(item.getSalePrice())
                .photo(p.getPhoto())
                .build();
    }
}
