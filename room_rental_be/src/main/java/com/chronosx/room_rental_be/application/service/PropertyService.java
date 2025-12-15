package com.chronosx.room_rental_be.application.service;

import java.util.List;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.booking.PropertyRequest;
import com.chronosx.room_rental_be.application.dto.booking.PropertyResponse;

public interface PropertyService {
    PropertyResponse createProperty(@Valid PropertyRequest request);

    PropertyResponse updateProperty(Long id, @Valid PropertyRequest request);

    void deleteProperty(Long id);

    PropertyResponse getProperty(Long id);

    List<PropertyResponse> search(String keyword, Long districtId, Long categoryId, Long minPrice, Long maxPrice);
}
