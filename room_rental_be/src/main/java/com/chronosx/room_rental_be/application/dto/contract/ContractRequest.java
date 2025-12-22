package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractRequest {
    @NotNull
    private Long propertyId;

    @NotNull
    private Long tenantId;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    private BigDecimal depositAmount;

    private String status;
}

