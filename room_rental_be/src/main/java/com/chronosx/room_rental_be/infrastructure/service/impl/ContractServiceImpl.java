package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.chronosx.room_rental_be.application.dto.contract.ContractRequest;
import com.chronosx.room_rental_be.application.dto.contract.ContractResponse;
import com.chronosx.room_rental_be.application.dto.property.PropertyBasicResponse;
import com.chronosx.room_rental_be.application.dto.property.TenantResponse;
import com.chronosx.room_rental_be.application.service.ContractService;
import com.chronosx.room_rental_be.domain.entity.Contract;
import com.chronosx.room_rental_be.domain.entity.enums.ContractStatus;
import com.chronosx.room_rental_be.domain.repository.ContractRepository;
import com.chronosx.room_rental_be.domain.repository.PropertyRepository;
import com.chronosx.room_rental_be.domain.repository.UserRepository;
import com.chronosx.room_rental_be.infrastructure.exception.BadRequestException;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    public ContractResponse create(ContractRequest request) {
        validateDates(request);
        var property = propertyRepository
                .findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        var tenant = userRepository
                .findById(request.getTenantId())
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

        Contract contract = Contract.builder()
                .property(property)
                .tenant(tenant)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .depositAmount(request.getDepositAmount())
                .status(parseStatus(request.getStatus(), ContractStatus.ACTIVE))
                .build();
        contractRepository.save(contract);
        return toResponse(contract);
    }

    @Override
    public ContractResponse update(Long id, ContractRequest request) {
        validateDates(request);
        Contract contract = contractRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        if (request.getPropertyId() != null) {
            var property = propertyRepository
                    .findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
            contract.setProperty(property);
        }
        if (request.getTenantId() != null) {
            var tenant = userRepository
                    .findById(request.getTenantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));
            contract.setTenant(tenant);
        }
        if (request.getStartDate() != null) {
            contract.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            contract.setEndDate(request.getEndDate());
        }
        if (request.getDepositAmount() != null) {
            contract.setDepositAmount(request.getDepositAmount());
        }
        if (StringUtils.hasText(request.getStatus())) {
            contract.setStatus(parseStatus(request.getStatus(), contract.getStatus()));
        }

        contractRepository.save(contract);
        return toResponse(contract);
    }

    @Override
    public void delete(Long id) {
        Contract contract = contractRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        contractRepository.delete(contract);
    }

    @Override
    public ContractResponse get(Long id) {
        Contract contract = contractRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        return toResponse(contract);
    }

    @Override
    public List<ContractResponse> list(Long tenantId, Long ownerId, String status) {
        List<Contract> contracts;
        if (tenantId != null) {
            contracts = contractRepository.findByTenantId(tenantId);
        } else if (ownerId != null) {
            contracts = contractRepository.findByPropertyOwnerId(ownerId);
        } else if (StringUtils.hasText(status)) {
            contracts = contractRepository.findByStatus(parseStatus(status, ContractStatus.ACTIVE));
        } else {
            contracts = contractRepository.findAll();
        }
        return contracts.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ContractStatus parseStatus(String status, ContractStatus defaultValue) {
        if (!StringUtils.hasText(status)) return defaultValue;
        try {
            return ContractStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException("Invalid contract status");
        }
    }

    private void validateDates(ContractRequest request) {
        if (request.getStartDate() != null
                && request.getEndDate() != null
                && request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("end_date must be after start_date");
        }
    }

    private ContractResponse toResponse(Contract contract) {
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
        return ContractResponse.builder()
                .id(contract.getId())
                .property(propertyBasic)
                .tenant(tenantResponse)
                .startDate(contract.getStartDate())
                .endDate(contract.getEndDate())
                .depositAmount(contract.getDepositAmount())
                .status(contract.getStatus() != null ? contract.getStatus().name() : null)
                .build();
    }
}

