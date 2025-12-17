package com.chronosx.room_rental_be.application.dto.property;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyBasicResponse {
    private Long id;
    private String title;
    private String address;
    private Long price;
}
