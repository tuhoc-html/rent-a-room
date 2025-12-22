package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.chronosx.room_rental_be.application.dto.property.PropertyBasicResponse;
import com.chronosx.room_rental_be.application.dto.property.TenantResponse;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractResponse {
    private Long id;
    private PropertyBasicResponse property;
    private TenantResponse tenant;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal depositAmount;
    private String status;
}

