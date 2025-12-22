package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceRequest {
    @NotNull
    private Long contractId;

    @NotNull
    @Min(1)
    @Max(12)
    private Integer month;

    @NotNull
    private Integer year;

    private BigDecimal electricityCost;

    private BigDecimal waterCost;

    private BigDecimal totalAmount;

    private String status;
}

