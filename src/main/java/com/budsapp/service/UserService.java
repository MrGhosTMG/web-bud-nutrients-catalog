package com.budsapp.service;

import com.budsapp.dto.UserDTO;
import com.budsapp.entity.User;
import com.budsapp.exception.ResourceNotFoundException;
import com.budsapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).toList();
    }

    public UserDTO getUserById(Long id) {
        return toDTO(findUser(id));
    }

    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        return toDTO(user);
    }

    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = findUser(id);
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getWeight() != null) user.setWeight(dto.getWeight());
        if (dto.getHeight() != null) user.setHeight(dto.getHeight());
        if (dto.getAdditionalInfo() != null) user.setAdditionalInfo(dto.getAdditionalInfo());
        if (dto.getPhoto() != null) user.setPhoto(dto.getPhoto());
        return toDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = findUser(id);
        userRepository.delete(user);
    }

    public UserDTO updatePhoto(Long id, String photoUrl) {
        User user = findUser(id);
        user.setPhoto(photoUrl);
        return toDTO(userRepository.save(user));
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    private UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .age(user.getAge())
                .gender(user.getGender())
                .weight(user.getWeight())
                .height(user.getHeight())
                .photo(user.getPhoto())
                .additionalInfo(user.getAdditionalInfo())
                .role(user.getRole())
                .build();
    }
}
