package com.chronosx.room_rental_be.infrastructure.exception;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
	private LocalDateTime timestamp;
	private int code;
	private String message;
	private String path;
}
