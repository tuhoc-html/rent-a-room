package com.chronosx.room_rental_be.infrastructure.exception;

public class UnauthorizedException extends AppException {
    public UnauthorizedException(String message) {
        super(ErrorCode.UNAUTHORIZED, message);
    }

    public UnauthorizedException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
