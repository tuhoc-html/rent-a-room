package com.chronosx.room_rental_be.application.dto.booking;

import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyResponse {
    private Long id;
    private String title;
    private String description;
    private Long price;
    private Double area;
    private String address;
    private String amenities;
    private Integer status;
    private DistrictResponse district;
    private CategoryResponse category;
    private UserBasicResponse owner;
    private List<PropertyImageResponse> images;
}
