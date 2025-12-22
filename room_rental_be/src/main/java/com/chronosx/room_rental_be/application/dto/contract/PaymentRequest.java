package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    @NotNull
    private Long invoiceId;

    @NotNull
    private String paymentMethod;

    @NotNull
    private BigDecimal amount;

    private LocalDateTime paymentDate;
}

