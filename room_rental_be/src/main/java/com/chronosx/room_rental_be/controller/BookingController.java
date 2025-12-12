package com.chronosx.room_rental_be.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chronosx.room_rental_be.application.dto.property.BookingResponse;
import com.chronosx.room_rental_be.application.dto.property.CreateBookingRequest;
import com.chronosx.room_rental_be.application.dto.property.UpdateBookingStatusRequest;
import com.chronosx.room_rental_be.application.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> create(@Valid @RequestBody CreateBookingRequest req) {
        return ResponseEntity.status(201).body(bookingService.createBooking(req));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponse> updateStatus(
            @PathVariable Long id, @Valid @RequestBody UpdateBookingStatusRequest req) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, req));
    }

    @GetMapping("/owner")
    public ResponseEntity<List<BookingResponse>> ownerBookings() {
        return ResponseEntity.ok(bookingService.getBookingsForOwner());
    }

    @GetMapping("/tenant")
    public ResponseEntity<List<BookingResponse>> tenantBookings() {
        return ResponseEntity.ok(bookingService.getBookingsForTenant());
    }
}
