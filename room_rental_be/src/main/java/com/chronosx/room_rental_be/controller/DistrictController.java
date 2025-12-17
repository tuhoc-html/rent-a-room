package com.chronosx.room_rental_be.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chronosx.room_rental_be.domain.entity.District;
import com.chronosx.room_rental_be.domain.repository.DistrictRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/districts")
public class DistrictController {

    private final DistrictRepository districtRepository;

    @GetMapping
    public ResponseEntity<List<District>> list() {
        return ResponseEntity.ok(districtRepository.findAll());
    }
}
