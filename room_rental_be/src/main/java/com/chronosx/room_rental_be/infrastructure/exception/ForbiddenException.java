package com.chronosx.room_rental_be.infrastructure.exception;

public class ForbiddenException extends AppException {
	public ForbiddenException(String message) {
		super(ErrorCode.FORBIDDEN, message);
	}

	public ForbiddenException(ErrorCode errorCode, String message) {
		super(errorCode, message);
	}
}
