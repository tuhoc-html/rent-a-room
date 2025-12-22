package com.chronosx.room_rental_be.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chronosx.room_rental_be.application.dto.contract.ContractRequest;
import com.chronosx.room_rental_be.application.dto.contract.ContractResponse;
import com.chronosx.room_rental_be.application.service.ContractService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractController {

    private final ContractService contractService;

    @GetMapping
    public ResponseEntity<List<ContractResponse>> list(
            @RequestParam(required = false) Long tenantId,
            @RequestParam(required = false) Long ownerId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(contractService.list(tenantId, ownerId, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(contractService.get(id));
    }

    @PostMapping
    public ResponseEntity<ContractResponse> create(@Valid @RequestBody ContractRequest request) {
        return ResponseEntity.status(201).body(contractService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractResponse> update(
            @PathVariable Long id, @Valid @RequestBody ContractRequest request) {
        return ResponseEntity.ok(contractService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contractService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

