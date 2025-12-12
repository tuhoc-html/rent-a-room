package com.chronosx.room_rental_be.infrastructure.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
	// 400 - Bad Request
	BAD_REQUEST(400, "Bad Request", HttpStatus.BAD_REQUEST),
	VALIDATION_ERROR(4001, "Validation Error", HttpStatus.BAD_REQUEST),

	// 401 - Unauthorized
	UNAUTHORIZED(401, "Unauthorized", HttpStatus.UNAUTHORIZED),
	INVALID_CREDENTIALS(4011, "Invalid credentials", HttpStatus.UNAUTHORIZED),
	TOKEN_EXPIRED(4012, "Token expired", HttpStatus.UNAUTHORIZED),
	TOKEN_INVALID(4013, "Token invalid", HttpStatus.UNAUTHORIZED),

	// 403 - Forbidden
	FORBIDDEN(403, "Forbidden", HttpStatus.FORBIDDEN),
	ACCESS_DENIED(4031, "Access denied", HttpStatus.FORBIDDEN),

	// 404 - Not Found
	NOT_FOUND(404, "Resource Not Found", HttpStatus.NOT_FOUND),
	USER_NOT_FOUND(4041, "User not found", HttpStatus.NOT_FOUND),
	PROPERTY_NOT_FOUND(4042, "Property not found", HttpStatus.NOT_FOUND),
	BOOKING_NOT_FOUND(4043, "Booking not found", HttpStatus.NOT_FOUND),

	// 409 - Conflict
	CONFLICT(409, "Conflict", HttpStatus.CONFLICT),
	DUPLICATE_ENTRY(4091, "Duplicate entry", HttpStatus.CONFLICT),

	// 500 - Internal Server Error
	INTERNAL_ERROR(500, "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR),
	DATABASE_ERROR(5001, "Database error", HttpStatus.INTERNAL_SERVER_ERROR),
	EXTERNAL_SERVICE_ERROR(5002, "External service error", HttpStatus.INTERNAL_SERVER_ERROR);

	private final int code;
	private final String message;
	private final HttpStatus httpStatus;
}
