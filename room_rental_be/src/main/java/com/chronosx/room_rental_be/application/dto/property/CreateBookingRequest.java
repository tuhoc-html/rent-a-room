package com.chronosx.room_rental_be.application.dto.property;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBookingRequest {
    @NotNull
    private Long propertyId;

    @NotNull
    private LocalDateTime bookingDate;

    @Size(max = 500)
    private String note;
}
