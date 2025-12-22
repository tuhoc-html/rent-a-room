package com.chronosx.room_rental_be.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chronosx.room_rental_be.application.dto.contract.PaymentRequest;
import com.chronosx.room_rental_be.application.dto.contract.PaymentResponse;
import com.chronosx.room_rental_be.application.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<PaymentResponse>> list(@RequestParam Long invoiceId) {
        return ResponseEntity.ok(paymentService.listByInvoice(invoiceId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.get(id));
    }

    @PostMapping
    public ResponseEntity<PaymentResponse> create(@Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.status(201).body(paymentService.create(request));
    }
}

