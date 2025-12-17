package com.chronosx.room_rental_be.application.dto.property;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private LocalDateTime bookingDate;
    private String note;
    private String status;
    private TenantResponse tenant;
    private PropertyBasicResponse property;
    private LocalDateTime createdAt;
}
