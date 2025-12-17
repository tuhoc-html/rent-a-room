package com.chronosx.room_rental_be.application.service;

import jakarta.validation.Valid;

import com.chronosx.room_rental_be.application.dto.auth.AuthResponse;
import com.chronosx.room_rental_be.application.dto.auth.LoginRequest;
import com.chronosx.room_rental_be.application.dto.auth.RegisterRequest;
import com.chronosx.room_rental_be.application.dto.auth.UserResponse;

public interface AuthService {
    AuthResponse login(@Valid LoginRequest request);

    UserResponse register(@Valid RegisterRequest request);

    UserResponse getCurrentUser();
}
