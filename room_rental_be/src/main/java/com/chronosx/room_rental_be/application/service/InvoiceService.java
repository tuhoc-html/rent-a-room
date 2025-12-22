package com.chronosx.room_rental_be.application.service;

import java.util.List;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.contract.InvoiceRequest;
import com.chronosx.room_rental_be.application.dto.contract.InvoiceResponse;

public interface InvoiceService {
    InvoiceResponse create(@Valid InvoiceRequest request);

    InvoiceResponse update(Long id, @Valid InvoiceRequest request);

    InvoiceResponse get(Long id);

    void delete(Long id);

    List<InvoiceResponse> list(Long contractId, Long tenantId, String status);
}

