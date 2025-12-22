package com.chronosx.room_rental_be.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chronosx.room_rental_be.domain.entity.Invoice;
import com.chronosx.room_rental_be.domain.entity.enums.InvoiceStatus;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByContractId(Long contractId);

    List<Invoice> findByContractTenantId(Long tenantId);

    List<Invoice> findByStatus(InvoiceStatus status);

    Optional<Invoice> findByContractIdAndMonthAndYear(Long contractId, Integer month, Integer year);
}

