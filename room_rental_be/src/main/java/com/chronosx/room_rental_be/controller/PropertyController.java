package com.chronosx.room_rental_be.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chronosx.room_rental_be.application.dto.booking.PropertyRequest;
import com.chronosx.room_rental_be.application.dto.booking.PropertyResponse;
import com.chronosx.room_rental_be.application.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ResponseEntity<PropertyResponse> create(@Valid @RequestBody PropertyRequest req) {
        return ResponseEntity.status(201).body(propertyService.createProperty(req));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PropertyResponse> update(@PathVariable Long id, @Valid @RequestBody PropertyRequest req) {
        return ResponseEntity.ok(propertyService.updateProperty(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(propertyService.getProperty(id));
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long districtId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice) {
        return ResponseEntity.ok(propertyService.search(q, districtId, categoryId, minPrice, maxPrice));
    }
}
