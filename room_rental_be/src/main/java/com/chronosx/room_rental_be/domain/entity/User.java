package com.chronosx.room_rental_be.domain.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.chronosx.room_rental_be.domain.entity.enums.UserRole;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // stored BCrypt

    @Column(name = "full_name")
    private String fullName;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    private String email;

    private LocalDateTime createdAt;
}
