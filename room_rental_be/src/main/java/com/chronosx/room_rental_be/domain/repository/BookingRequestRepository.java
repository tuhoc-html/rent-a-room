package com.chronosx.room_rental_be.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chronosx.room_rental_be.domain.entity.BookingRequest;
import com.chronosx.room_rental_be.domain.entity.enums.BookingStatus;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long> {
    List<BookingRequest> findByPropertyOwnerIdAndStatus(Long ownerId, BookingStatus status);

    List<BookingRequest> findByTenantId(Long tenantId);

    boolean existsByTenantIdAndBookingDate(Long tenantId, LocalDateTime bookingDate);
}
