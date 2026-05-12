package com.budsapp.service;

import com.budsapp.dto.ProductRequestDTO;
import com.budsapp.entity.ProductRequest;
import com.budsapp.entity.User;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.ProductRequestRepository;
import com.budsapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final ProductRequestRepository requestRepository;
    private final UserRepository userRepository;

    public List<ProductRequestDTO> getAllRequests() {
        return requestRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<ProductRequestDTO> getUserRequests(Long userId) {
        return requestRepository.findByUserId(userId).stream().map(this::toDTO).toList();
    }

    public ProductRequestDTO createRequest(Long userId, ProductRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ProductRequest request = ProductRequest.builder()
                .user(user)
                .productName(dto.getProductName())
                .category(dto.getCategory())
                .manufacturer(dto.getManufacturer())
                .photo(dto.getPhoto())
                .link(dto.getLink())
                .notes(dto.getNotes())
                .build();
        return toDTO(requestRepository.save(request));
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    private ProductRequestDTO toDTO(ProductRequest request) {
        return ProductRequestDTO.builder()
                .id(request.getId())
                .userId(request.getUser().getId())
                .userName(request.getUser().getFullName())
                .productName(request.getProductName())
                .category(request.getCategory())
                .manufacturer(request.getManufacturer())
                .photo(request.getPhoto())
                .link(request.getLink())
                .notes(request.getNotes())
                .dateAdded(request.getDateAdded())
                .status(request.getStatus())
                .build();
    }
}
