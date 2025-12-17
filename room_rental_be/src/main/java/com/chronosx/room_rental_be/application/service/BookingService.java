package com.chronosx.room_rental_be.application.service;

import java.util.List;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.property.BookingResponse;
import com.chronosx.room_rental_be.application.dto.property.CreateBookingRequest;
import com.chronosx.room_rental_be.application.dto.property.UpdateBookingStatusRequest;

public interface BookingService {
    BookingResponse createBooking(@Valid CreateBookingRequest request);

    BookingResponse updateBookingStatus(Long bookingId, @Valid UpdateBookingStatusRequest request);

    List<BookingResponse> getBookingsForOwner();

    List<BookingResponse> getBookingsForTenant();
}
