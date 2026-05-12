package com.budsapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PasswordChangeRequest {
    @NotBlank
    private String currentPassword;

    @NotBlank @Size(min = 8)
    private String newPassword;
}
