package com.chronosx.room_rental_be.application.dto.booking;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyImageResponse {
    private Long id;
    private String imageUrl;
}
