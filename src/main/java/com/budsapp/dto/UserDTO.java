package com.budsapp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDTO {
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private Integer age;
    private String gender;
    private Integer weight;
    private Integer height;
    private String photo;
    private String additionalInfo;
    private String role;
}
