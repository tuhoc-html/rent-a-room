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
<<<<<<< HEAD
=======
    private String tokenType = "Bearer";
>>>>>>> nhanh-cua-kiet
=======
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
    private Long userId;
    private String username;
    private String role;
}
