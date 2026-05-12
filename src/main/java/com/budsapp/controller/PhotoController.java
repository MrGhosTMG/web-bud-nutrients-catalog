package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.dto.ProductDTO;
import com.budsapp.dto.UserDTO;
import com.budsapp.service.ProductService;
import com.budsapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class PhotoController {

    @Value("${file.upload-dir:uploads/photos}")
    private String uploadDir;

    private final UserService userService;
    private final ProductService productService;

    @PostMapping("/user/{userId}/photo")
    public ResponseEntity<ApiResponse<UserDTO>> uploadUserPhoto(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) throws IOException {
        String photoUrl = saveFile(file);
        return ResponseEntity.ok(ApiResponse.ok("Photo uploaded", userService.updatePhoto(userId, photoUrl)));
    }

    @PostMapping("/product/{productId}/photo")
    public ResponseEntity<ApiResponse<ProductDTO>> uploadProductPhoto(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file) throws IOException {
        String photoUrl = saveFile(file);
        return ResponseEntity.ok(ApiResponse.ok("Photo uploaded", productService.updatePhoto(productId, photoUrl)));
    }

    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);
        return "/uploads/" + filename;
    }
}
