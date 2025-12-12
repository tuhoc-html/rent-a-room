package com.chronosx.room_rental_be.application.dto.property;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TenantResponse {
    private Long id;
    private String username;
    private String fullName;
    private String phone;
    private String email;
}
