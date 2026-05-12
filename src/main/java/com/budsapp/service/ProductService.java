package com.budsapp.service;

import com.budsapp.dto.ProductDTO;
import com.budsapp.entity.Product;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<ProductDTO> getProductsBySourceType(String sourceType) {
        return productRepository.findBySourceType(sourceType).stream().map(this::toDTO).toList();
    }

    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findByIsAvailableTrue().stream().map(this::toDTO).toList();
    }

    public List<ProductDTO> getOrderedProducts() {
        return productRepository.findByOrderStatusIsNotNull().stream().map(this::toDTO).toList();
    }

    public ProductDTO getProductById(Long id) {
        return toDTO(findProduct(id));
    }

    public ProductDTO createProduct(ProductDTO dto) {
        Product product = Product.builder()
                .name(dto.getName())
                .manufacturer(dto.getManufacturer())
                .category(dto.getCategory())
                .myPrice(dto.getMyPrice())
                .catalogPrice(dto.getCatalogPrice())
                .quantity(dto.getQuantity() != null ? dto.getQuantity() : 0)
                .photo(dto.getPhoto())
                .description(dto.getDescription())
                .isAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true)
                .orderStatus(dto.getOrderStatus())
                .sourceType(dto.getSourceType())
                .inStock(dto.getQuantity() != null && dto.getQuantity() > 0)
                .soldQuantity(dto.getSoldQuantity() != null ? dto.getSoldQuantity() : 0)
                .expiryDate(dto.getExpiryDate())
                .orderDate(dto.getOrderDate())
                .forSale(dto.getForSale() != null ? dto.getForSale() : false)
                .actualSoldPrice(dto.getActualSoldPrice())
                .build();
        return toDTO(productRepository.save(product));
    }

    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = findProduct(id);
        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getManufacturer() != null) product.setManufacturer(dto.getManufacturer());
        if (dto.getCategory() != null) product.setCategory(dto.getCategory());
        if (dto.getMyPrice() != null) product.setMyPrice(dto.getMyPrice());
        if (dto.getCatalogPrice() != null) product.setCatalogPrice(dto.getCatalogPrice());
        if (dto.getQuantity() != null) {
            product.setQuantity(dto.getQuantity());
            product.setInStock(dto.getQuantity() > 0);
        }
        if (dto.getPhoto() != null) product.setPhoto(dto.getPhoto());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getIsAvailable() != null) product.setIsAvailable(dto.getIsAvailable());
        if (dto.getOrderStatus() != null) product.setOrderStatus(dto.getOrderStatus());
        if (dto.getSourceType() != null) product.setSourceType(dto.getSourceType());
        if (dto.getSoldQuantity() != null) product.setSoldQuantity(dto.getSoldQuantity());
        if (dto.getExpiryDate() != null) product.setExpiryDate(dto.getExpiryDate());
        if (dto.getOrderDate() != null) product.setOrderDate(dto.getOrderDate());
        if (dto.getForSale() != null) product.setForSale(dto.getForSale());
        if (dto.getActualSoldPrice() != null) product.setActualSoldPrice(dto.getActualSoldPrice());
        return toDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.delete(findProduct(id));
    }

    public ProductDTO updatePhoto(Long id, String photoUrl) {
        Product product = findProduct(id);
        product.setPhoto(photoUrl);
        return toDTO(productRepository.save(product));
    }

    public List<ProductDTO> search(String term) {
        return productRepository.search(term).stream().map(this::toDTO).toList();
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    private ProductDTO toDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .manufacturer(product.getManufacturer())
                .category(product.getCategory())
                .myPrice(product.getMyPrice())
                .catalogPrice(product.getCatalogPrice())
                .quantity(product.getQuantity())
                .photo(product.getPhoto())
                .description(product.getDescription())
                .isAvailable(product.getIsAvailable())
                .orderStatus(product.getOrderStatus())
                .sourceType(product.getSourceType())
                .inStock(product.getInStock())
                .soldQuantity(product.getSoldQuantity())
                .expiryDate(product.getExpiryDate())
                .orderDate(product.getOrderDate())
                .forSale(product.getForSale())
                .actualSoldPrice(product.getActualSoldPrice())
                .addedDate(product.getAddedDate())
                .build();
    }
}
