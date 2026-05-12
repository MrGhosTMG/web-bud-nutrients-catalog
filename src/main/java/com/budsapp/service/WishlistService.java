package com.budsapp.service;

import com.budsapp.dto.WishlistItemDTO;
import com.budsapp.entity.Product;
import com.budsapp.entity.User;
import com.budsapp.entity.UserWishlistItem;
import com.budsapp.exception.BadRequestException;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.ProductRepository;
import com.budsapp.repository.UserRepository;
import com.budsapp.repository.UserWishlistItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final UserWishlistItemRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<WishlistItemDTO> getUserWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId).stream().map(this::toDTO).toList();
    }

    public WishlistItemDTO addToWishlist(Long userId, Long productId) {
        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            throw new BadRequestException("Product already in wishlist");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        UserWishlistItem item = UserWishlistItem.builder()
                .user(user)
                .product(product)
                .build();
        return toDTO(wishlistRepository.save(item));
    }

    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public void toggleDone(Long id) {
        UserWishlistItem item = wishlistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found"));
        item.setIsDone(!item.getIsDone());
        wishlistRepository.save(item);
    }

    public List<WishlistItemDTO> getProductsInWishlists(Long productId) {
        return wishlistRepository.findByProductId(productId).stream().map(this::toDTO).toList();
    }

    private WishlistItemDTO toDTO(UserWishlistItem item) {
        Product p = item.getProduct();
        return WishlistItemDTO.builder()
                .id(item.getId())
                .productId(p.getId())
                .productName(p.getName())
                .manufacturer(p.getManufacturer())
                .category(p.getCategory())
                .catalogPrice(p.getCatalogPrice())
                .photo(p.getPhoto())
                .description(p.getDescription())
                .isDone(item.getIsDone())
                .addedDate(item.getAddedDate())
                .build();
    }
}
