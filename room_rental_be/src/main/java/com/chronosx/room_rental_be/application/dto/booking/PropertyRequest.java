package com.chronosx.room_rental_be.application.dto.booking;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Min(0)
    private Long price;

    @NotNull
    private Double area;

    @NotBlank
    private String address;

    private String amenities;

    @NotNull
    private Long districtId;

    @NotNull
    private Long categoryId;

    private List<String> imageUrls; // cloudinary URLs provided from frontend or returned after upload
}
