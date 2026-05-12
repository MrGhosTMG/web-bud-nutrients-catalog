package com.budsapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RegisterRequest {
    @NotBlank @Size(min = 6, max = 50)
    private String username;

    @NotBlank @Size(min = 8)
    private String password;

    @NotBlank
    private String fullName;

    @Email
    private String email;

    private String phone;
}
