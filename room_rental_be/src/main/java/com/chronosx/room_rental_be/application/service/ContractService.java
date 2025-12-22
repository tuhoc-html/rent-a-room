package com.chronosx.room_rental_be.application.service;

import java.util.List;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.contract.ContractRequest;
import com.chronosx.room_rental_be.application.dto.contract.ContractResponse;

public interface ContractService {
    ContractResponse create(@Valid ContractRequest request);

    ContractResponse update(Long id, @Valid ContractRequest request);

    void delete(Long id);

    ContractResponse get(Long id);

    List<ContractResponse> list(Long tenantId, Long ownerId, String status);
}

