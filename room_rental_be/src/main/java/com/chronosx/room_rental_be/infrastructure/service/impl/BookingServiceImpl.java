package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chronosx.room_rental_be.application.dto.property.*;
import com.chronosx.room_rental_be.application.service.BookingService;
import com.chronosx.room_rental_be.domain.entity.BookingRequest;
import com.chronosx.room_rental_be.domain.entity.enums.BookingStatus;
import com.chronosx.room_rental_be.domain.repository.BookingRequestRepository;
import com.chronosx.room_rental_be.domain.repository.PropertyRepository;
import com.chronosx.room_rental_be.domain.repository.UserRepository;
import com.chronosx.room_rental_be.infrastructure.exception.BadRequestException;
import com.chronosx.room_rental_be.infrastructure.exception.ForbiddenException;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;
import com.chronosx.room_rental_be.infrastructure.exception.UnauthorizedException;
import com.chronosx.room_rental_be.infrastructure.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRequestRepository bookingRepo;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public BookingResponse createBooking(CreateBookingRequest request) {
        if (request.getBookingDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("booking_date must be in the future");
        }
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Not authenticated");
        String username = auth.getName();
        var tenant = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var prop = propertyRepository
                .findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        if (prop.getStatus() == null || prop.getStatus() == 0) {
            throw new BadRequestException("Property is not available");
        }

        if (bookingRepo.existsByTenantIdAndBookingDate(tenant.getId(), request.getBookingDate())) {
            throw new BadRequestException("You already have booking at this time");
        }

        BookingRequest br = BookingRequest.builder()
                .bookingDate(request.getBookingDate())
                .note(request.getNote())
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .tenant(tenant)
                .property(prop)
                .build();
        bookingRepo.save(br);
        return toResponse(br);
    }

    @Override
    public BookingResponse updateBookingStatus(Long bookingId, UpdateBookingStatusRequest request) {
        var br = bookingRepo.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        // check current user is owner of property
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Not authenticated");
        String username = auth.getName();
        var owner = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!br.getProperty().getOwner().getId().equals(owner.getId())) {
            throw new ForbiddenException("Not owner of this property");
        }

        if ("APPROVE".equalsIgnoreCase(request.getAction())) {
            br.setStatus(BookingStatus.APPROVED);
            // optionally set property to rented/hide: p.setStatus(0)
            // send email to tenant
            if (br.getTenant().getEmail() != null) {
                String to = br.getTenant().getEmail();
                String subject = "Booking Accepted";
                String text = String.format(
                        "Your booking for property '%s' on %s has been accepted.",
                        br.getProperty().getTitle(), br.getBookingDate().toString());
                try {
                    emailService.sendSimpleEmail(to, subject, text);
                } catch (Exception ex) {
                    // log but don't fail
                }
            }
        } else if ("REJECT".equalsIgnoreCase(request.getAction()) || "REJECTED".equalsIgnoreCase(request.getAction())) {
            br.setStatus(BookingStatus.REJECTED);
        } else {
            throw new BadRequestException("Invalid action");
        }
        bookingRepo.save(br);
        return toResponse(br);
    }

    @Override
    public List<BookingResponse> getBookingsForOwner() {
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Not authenticated");
        var owner = userRepository
                .findByUsername(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var bookings = bookingRepo.findAll().stream()
                .filter(b -> b.getProperty().getOwner().getId().equals(owner.getId()))
                .collect(Collectors.toList());
        return bookings.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getBookingsForTenant() {
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Not authenticated");
        var tenant = userRepository
                .findByUsername(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var bookings = bookingRepo.findByTenantId(tenant.getId());
        return bookings.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private BookingResponse toResponse(BookingRequest br) {
        var tenant = TenantResponse.builder()
                .id(br.getTenant().getId())
                .username(br.getTenant().getUsername())
                .fullName(br.getTenant().getFullName())
                .phone(br.getTenant().getPhone())
                .email(br.getTenant().getEmail())
                .build();
        var prop = PropertyBasicResponse.builder()
                .id(br.getProperty().getId())
                .title(br.getProperty().getTitle())
                .address(br.getProperty().getAddress())
                .price(br.getProperty().getPrice())
                .build();
        return BookingResponse.builder()
                .id(br.getId())
                .bookingDate(br.getBookingDate())
                .note(br.getNote())
                .status(br.getStatus().name())
                .tenant(tenant)
                .property(prop)
                .createdAt(br.getCreatedAt())
                .build();
    }
}
