package com.chronosx.room_rental_be.infrastructure.exception;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	// Handle custom AppException
	@ExceptionHandler(AppException.class)
	public ResponseEntity<ErrorResponse> handleAppException(AppException ex, WebRequest request) {
		log.error("AppException: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ex.getErrorCode().getCode())
				.message(ex.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ex.getErrorCode().getHttpStatus());
	}

	// Handle validation errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(
			MethodArgumentNotValidException ex, WebRequest request) {
		String message = ex.getBindingResult().getFieldErrors().stream()
				.map(FieldError::getDefaultMessage)
				.collect(Collectors.joining("; "));
		log.error("Validation error: {}", message);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.VALIDATION_ERROR.getCode())
				.message(message.isEmpty() ? ErrorCode.VALIDATION_ERROR.getMessage() : message)
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.VALIDATION_ERROR.getHttpStatus());
	}

	// Handle Spring Security AuthenticationException
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ErrorResponse> handleAuthenticationException(
			AuthenticationException ex, WebRequest request) {
		log.error("Authentication error: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.UNAUTHORIZED.getCode())
				.message(ex.getMessage() != null ? ex.getMessage() : ErrorCode.UNAUTHORIZED.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.UNAUTHORIZED.getHttpStatus());
	}

	// Handle Spring Security BadCredentialsException
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorResponse> handleBadCredentialsException(
			BadCredentialsException ex, WebRequest request) {
		log.error("Bad credentials: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.INVALID_CREDENTIALS.getCode())
				.message(ErrorCode.INVALID_CREDENTIALS.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.INVALID_CREDENTIALS.getHttpStatus());
	}

	// Handle Spring Security AccessDeniedException
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorResponse> handleAccessDeniedException(
			AccessDeniedException ex, WebRequest request) {
		log.error("Access denied: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.FORBIDDEN.getCode())
				.message(ErrorCode.FORBIDDEN.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.FORBIDDEN.getHttpStatus());
	}

	// Handle file upload size exceeded
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(
			MaxUploadSizeExceededException ex, WebRequest request) {
		log.error("File upload size exceeded: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.BAD_REQUEST.getCode())
				.message("File size exceeds maximum allowed size")
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.BAD_REQUEST.getHttpStatus());
	}

	// Handle IllegalArgumentException
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
			IllegalArgumentException ex, WebRequest request) {
		log.error("Illegal argument: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.BAD_REQUEST.getCode())
				.message(ex.getMessage() != null ? ex.getMessage() : ErrorCode.BAD_REQUEST.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.BAD_REQUEST.getHttpStatus());
	}

	// Handle NullPointerException
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ErrorResponse> handleNullPointerException(
			NullPointerException ex, WebRequest request) {
		log.error("Null pointer exception: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.INTERNAL_ERROR.getCode())
				.message("An internal error occurred")
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.INTERNAL_ERROR.getHttpStatus());
	}

	// Handle all other exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex, WebRequest request) {
		log.error("Unexpected error: {}", ex.getMessage(), ex);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.timestamp(LocalDateTime.now())
				.code(ErrorCode.INTERNAL_ERROR.getCode())
				.message(ex.getMessage() != null ? ex.getMessage() : ErrorCode.INTERNAL_ERROR.getMessage())
				.path(request.getDescription(false).replace("uri=", ""))
				.build();
		return new ResponseEntity<>(errorResponse, ErrorCode.INTERNAL_ERROR.getHttpStatus());
	}
}
