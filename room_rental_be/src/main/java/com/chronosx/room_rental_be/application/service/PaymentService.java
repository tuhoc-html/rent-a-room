package com.chronosx.room_rental_be.application.service;

import java.util.List;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.contract.PaymentRequest;
import com.chronosx.room_rental_be.application.dto.contract.PaymentResponse;

public interface PaymentService {
    PaymentResponse create(@Valid PaymentRequest request);

    PaymentResponse get(Long id);

    List<PaymentResponse> listByInvoice(Long invoiceId);
}

