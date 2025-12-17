package com.chronosx.room_rental_be.application.dto.property;

import jakarta.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBookingStatusRequest {
    @NotNull
    private String action; // APPROVE or REJECT
}
