package com.chronosx.room_rental_be.application.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
<<<<<<< HEAD
=======
    private String tokenType = "Bearer";
>>>>>>> nhanh-cua-kiet
    private Long userId;
    private String username;
    private String role;
}
