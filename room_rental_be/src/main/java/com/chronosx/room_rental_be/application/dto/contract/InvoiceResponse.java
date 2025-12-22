package com.chronosx.room_rental_be.application.dto.contract;

import java.math.BigDecimal;
import java.util.List;

import com.chronosx.room_rental_be.application.dto.property.PropertyBasicResponse;
import com.chronosx.room_rental_be.application.dto.property.TenantResponse;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceResponse {
    private Long id;
    private Long contractId;
    private Integer month;
    private Integer year;
    private BigDecimal electricityCost;
    private BigDecimal waterCost;
    private BigDecimal totalAmount;
    private String status;
    private PropertyBasicResponse property;
    private TenantResponse tenant;
    private List<PaymentResponse> payments;
}

