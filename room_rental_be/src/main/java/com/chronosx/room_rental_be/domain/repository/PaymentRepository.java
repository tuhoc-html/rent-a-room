package com.chronosx.room_rental_be.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chronosx.room_rental_be.domain.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByInvoiceId(Long invoiceId);
}

