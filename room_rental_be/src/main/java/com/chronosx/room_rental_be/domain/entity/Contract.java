package com.chronosx.room_rental_be.domain.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;

import com.chronosx.room_rental_be.domain.entity.enums.ContractStatus;

import lombok.*;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private User tenant;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(precision = 12, scale = 2)
    private BigDecimal depositAmount;

    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    @OneToMany(mappedBy = "contract", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invoice> invoices;
}

