package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.chronosx.room_rental_be.application.dto.contract.InvoiceRequest;
import com.chronosx.room_rental_be.application.dto.contract.InvoiceResponse;
import com.chronosx.room_rental_be.application.dto.contract.PaymentResponse;
import com.chronosx.room_rental_be.application.dto.property.PropertyBasicResponse;
import com.chronosx.room_rental_be.application.dto.property.TenantResponse;
import com.chronosx.room_rental_be.application.service.InvoiceService;
import com.chronosx.room_rental_be.domain.entity.Invoice;
import com.chronosx.room_rental_be.domain.entity.enums.InvoiceStatus;
import com.chronosx.room_rental_be.domain.repository.ContractRepository;
import com.chronosx.room_rental_be.domain.repository.InvoiceRepository;
import com.chronosx.room_rental_be.infrastructure.exception.BadRequestException;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ContractRepository contractRepository;

    @Override
    public InvoiceResponse create(InvoiceRequest request) {
        var contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        invoiceRepository
                .findByContractIdAndMonthAndYear(request.getContractId(), request.getMonth(), request.getYear())
                .ifPresent(inv -> {
                    throw new BadRequestException("Invoice for this period already exists");
                });
        Invoice invoice = Invoice.builder()
                .contract(contract)
                .month(request.getMonth())
                .year(request.getYear())
                .electricityCost(request.getElectricityCost())
                .waterCost(request.getWaterCost())
                .totalAmount(request.getTotalAmount())
                .status(parseStatus(request.getStatus(), InvoiceStatus.UNPAID))
                .build();
        invoiceRepository.save(invoice);
        return toResponse(invoice);
    }

    @Override
    public InvoiceResponse update(Long id, InvoiceRequest request) {
        Invoice invoice = invoiceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        if (request.getContractId() != null) {
            var contract = contractRepository
                    .findById(request.getContractId())
                    .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
            invoice.setContract(contract);
        }
        if (request.getMonth() != null) {
            invoice.setMonth(request.getMonth());
        }
        if (request.getYear() != null) {
            invoice.setYear(request.getYear());
        }
        if (request.getElectricityCost() != null) {
            invoice.setElectricityCost(request.getElectricityCost());
        }
        if (request.getWaterCost() != null) {
            invoice.setWaterCost(request.getWaterCost());
        }
        if (request.getTotalAmount() != null) {
            invoice.setTotalAmount(request.getTotalAmount());
        }
        if (StringUtils.hasText(request.getStatus())) {
            invoice.setStatus(parseStatus(request.getStatus(), invoice.getStatus()));
        }
        invoiceRepository.save(invoice);
        return toResponse(invoice);
    }

    @Override
    public InvoiceResponse get(Long id) {
        Invoice invoice = invoiceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        return toResponse(invoice);
    }

    @Override
    public void delete(Long id) {
        Invoice invoice = invoiceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        invoiceRepository.delete(invoice);
    }

    @Override
    public List<InvoiceResponse> list(Long contractId, Long tenantId, String status) {
        List<Invoice> invoices;
        if (contractId != null) {
            invoices = invoiceRepository.findByContractId(contractId);
        } else if (tenantId != null) {
            invoices = invoiceRepository.findByContractTenantId(tenantId);
        } else if (StringUtils.hasText(status)) {
            invoices = invoiceRepository.findByStatus(parseStatus(status, InvoiceStatus.UNPAID));
        } else {
            invoices = invoiceRepository.findAll();
        }
        return invoices.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private InvoiceStatus parseStatus(String status, InvoiceStatus defaultValue) {
        if (!StringUtils.hasText(status)) return defaultValue;
        try {
            return InvoiceStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException("Invalid invoice status");
        }
    }

    private InvoiceResponse toResponse(Invoice invoice) {
        var contract = invoice.getContract();
        var property = contract.getProperty();
        var tenant = contract.getTenant();
        PropertyBasicResponse propertyBasic = PropertyBasicResponse.builder()
                .id(property.getId())
                .title(property.getTitle())
                .address(property.getAddress())
                .price(property.getPrice())
                .build();
        TenantResponse tenantResponse = TenantResponse.builder()
                .id(tenant.getId())
                .username(tenant.getUsername())
                .fullName(tenant.getFullName())
                .phone(tenant.getPhone())
                .email(tenant.getEmail())
                .build();

        List<PaymentResponse> payments = invoice.getPayments() == null
                ? List.of()
                : invoice.getPayments().stream()
                        .map(p -> PaymentResponse.builder()
                                .id(p.getId())
                                .invoiceId(invoice.getId())
                                .paymentMethod(
                                        p.getPaymentMethod() != null ? p.getPaymentMethod().name() : null)
                                .amount(p.getAmount())
                                .paymentDate(p.getPaymentDate())
                                .build())
                        .collect(Collectors.toList());

        return InvoiceResponse.builder()
                .id(invoice.getId())
                .contractId(contract.getId())
                .month(invoice.getMonth())
                .year(invoice.getYear())
                .electricityCost(invoice.getElectricityCost())
                .waterCost(invoice.getWaterCost())
                .totalAmount(invoice.getTotalAmount())
                .status(invoice.getStatus() != null ? invoice.getStatus().name() : null)
                .property(propertyBasic)
                .tenant(tenantResponse)
                .payments(payments)
                .build();
    }
}

