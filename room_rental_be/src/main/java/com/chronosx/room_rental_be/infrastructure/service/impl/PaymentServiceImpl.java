package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.chronosx.room_rental_be.application.dto.contract.PaymentRequest;
import com.chronosx.room_rental_be.application.dto.contract.PaymentResponse;
import com.chronosx.room_rental_be.application.service.PaymentService;
import com.chronosx.room_rental_be.domain.entity.Payment;
import com.chronosx.room_rental_be.domain.entity.enums.InvoiceStatus;
import com.chronosx.room_rental_be.domain.entity.enums.PaymentMethod;
import com.chronosx.room_rental_be.domain.repository.InvoiceRepository;
import com.chronosx.room_rental_be.domain.repository.PaymentRepository;
import com.chronosx.room_rental_be.infrastructure.exception.BadRequestException;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    @Override
    public PaymentResponse create(PaymentRequest request) {
        var invoice = invoiceRepository
                .findById(request.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        Payment payment = Payment.builder()
                .invoice(invoice)
                .paymentMethod(parseMethod(request.getPaymentMethod()))
                .amount(request.getAmount())
                .paymentDate(request.getPaymentDate() != null ? request.getPaymentDate() : LocalDateTime.now())
                .build();
        paymentRepository.save(payment);

        // mark invoice as paid if amount covers total (simple rule)
        if (invoice.getTotalAmount() != null && request.getAmount() != null) {
            if (request.getAmount().compareTo(invoice.getTotalAmount()) >= 0) {
                invoice.setStatus(InvoiceStatus.PAID);
                invoiceRepository.save(invoice);
            }
        }

        return toResponse(payment);
    }

    @Override
    public PaymentResponse get(Long id) {
        Payment payment = paymentRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        return toResponse(payment);
    }

    @Override
    public List<PaymentResponse> listByInvoice(Long invoiceId) {
        var payments = paymentRepository.findByInvoiceId(invoiceId);
        return payments.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private PaymentMethod parseMethod(String method) {
        if (!StringUtils.hasText(method)) {
            throw new BadRequestException("payment_method is required");
        }
        try {
            return PaymentMethod.valueOf(method.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException("Invalid payment method");
        }
    }

    private PaymentResponse toResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .invoiceId(payment.getInvoice().getId())
                .paymentMethod(payment.getPaymentMethod() != null ? payment.getPaymentMethod().name() : null)
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .build();
    }
}

