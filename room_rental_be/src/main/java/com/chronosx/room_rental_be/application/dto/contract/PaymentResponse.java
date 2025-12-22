package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private Long invoiceId;
    private String paymentMethod;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
}

