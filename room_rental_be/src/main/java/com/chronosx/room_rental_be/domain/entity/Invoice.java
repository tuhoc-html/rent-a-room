package com.chronosx.room_rental_be.domain.entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;

import com.chronosx.room_rental_be.domain.entity.enums.InvoiceStatus;

import lombok.*;

@Entity
@Table(
        name = "invoices",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"contract_id", "month", "year"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    private Integer month;

    private Integer year;

    @Column(precision = 12, scale = 2)
    private BigDecimal electricityCost;

    @Column(precision = 12, scale = 2)
    private BigDecimal waterCost;

    @Column(precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;
}

