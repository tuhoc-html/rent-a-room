package com.chronosx.room_rental_be.application.dto.booking;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DistrictResponse {
    private Long id;
    private String name;
}
