package com.chronosx.room_rental_be.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chronosx.room_rental_be.domain.entity.Contract;
import com.chronosx.room_rental_be.domain.entity.enums.ContractStatus;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByTenantId(Long tenantId);

    List<Contract> findByPropertyOwnerId(Long ownerId);

    List<Contract> findByStatus(ContractStatus status);
}

