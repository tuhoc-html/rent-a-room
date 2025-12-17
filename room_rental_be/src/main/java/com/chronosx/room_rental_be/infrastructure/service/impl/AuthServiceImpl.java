package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chronosx.room_rental_be.application.dto.auth.AuthResponse;
import com.chronosx.room_rental_be.application.dto.auth.LoginRequest;
import com.chronosx.room_rental_be.application.dto.auth.RegisterRequest;
import com.chronosx.room_rental_be.application.dto.auth.UserResponse;
import com.chronosx.room_rental_be.application.service.AuthService;
import com.chronosx.room_rental_be.domain.entity.User;
import com.chronosx.room_rental_be.domain.entity.enums.UserRole;
import com.chronosx.room_rental_be.domain.repository.UserRepository;
import com.chronosx.room_rental_be.infrastructure.exception.BadRequestException;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;
import com.chronosx.room_rental_be.infrastructure.exception.UnauthorizedException;
import com.chronosx.room_rental_be.infrastructure.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User u = userRepository
                    .findByUsername(request.getUsername())
                    .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
            String token = jwtService.generateToken(
                    u.getUsername(), u.getId(), u.getRole().name());
            return AuthResponse.builder()
                    .token(token)
                    .userId(u.getId())
                    .username(u.getUsername())
                    .role(u.getRole().name())
                    .build();
        } catch (BadCredentialsException ex) {
            throw new UnauthorizedException("Invalid username or password");
        }
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already taken");
        }
        User u = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .role(UserRole.valueOf(request.getRole()))
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(u);
        return UserResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .role(u.getRole().name())
                .build();
    }

    @Override
    public UserResponse getCurrentUser() {
        // Implementation depends on SecurityContext. Provide sample basic implementation.
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("Not authenticated");
        }
        String username = auth.getName();
        User u = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .role(u.getRole().name())
                .build();
    }
}
