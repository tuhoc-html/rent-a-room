package com.chronosx.room_rental_be.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chronosx.room_rental_be.application.dto.contract.InvoiceRequest;
import com.chronosx.room_rental_be.application.dto.contract.InvoiceResponse;
import com.chronosx.room_rental_be.application.service.InvoiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> list(
            @RequestParam(required = false) Long contractId,
            @RequestParam(required = false) Long tenantId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(invoiceService.list(contractId, tenantId, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.get(id));
    }

    @PostMapping
    public ResponseEntity<InvoiceResponse> create(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.status(201).body(invoiceService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceResponse> update(
            @PathVariable Long id, @Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.ok(invoiceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoiceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

