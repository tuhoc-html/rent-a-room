package com.chronosx.room_rental_be.infrastructure.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.security.core.context.SecurityContextHolder;
=======
>>>>>>> nhanh-cua-kiet
=======
import org.springframework.security.core.context.SecurityContextHolder;
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chronosx.room_rental_be.application.dto.booking.*;
import com.chronosx.room_rental_be.application.service.PropertyService;
import com.chronosx.room_rental_be.domain.entity.Property;
import com.chronosx.room_rental_be.domain.entity.PropertyImage;
import com.chronosx.room_rental_be.domain.repository.*;
import com.chronosx.room_rental_be.infrastructure.exception.ResourceNotFoundException;
import com.chronosx.room_rental_be.infrastructure.exception.UnauthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final DistrictRepository districtRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final PropertyImageRepository imageRepository;

    @Override
    public PropertyResponse createProperty(PropertyRequest request) {
        var district = districtRepository
                .findById(request.getDistrictId())
                .orElseThrow(() -> new ResourceNotFoundException("District not found"));
        var category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // current user as owner
<<<<<<< HEAD
<<<<<<< HEAD
        var auth = SecurityContextHolder.getContext().getAuthentication();
=======
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext()
=======
        var auth = SecurityContextHolder.getContext()
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
                .getAuthentication();
>>>>>>> nhanh-cua-kiet
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("Not authenticated");
        }
        String username = auth.getName();
        var owner = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Property p = Property.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .area(request.getArea())
                .address(request.getAddress())
                .amenities(request.getAmenities())
                .status(1)
                .district(district)
                .category(category)
                .owner(owner)
                .build();
        propertyRepository.save(p);

        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<PropertyImage> imgs = request.getImageUrls().stream()
                    .map(url ->
                            PropertyImage.builder().imageUrl(url).property(p).build())
                    .collect(Collectors.toList());
            imageRepository.saveAll(imgs);
            p.setImages(imgs);
        }
        return toResponse(p);
    }

    @Override
    public PropertyResponse updateProperty(Long id, PropertyRequest request) {
        Property p =
                propertyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        // TODO: check ownership
        p.setTitle(request.getTitle());
        p.setDescription(request.getDescription());
        p.setPrice(request.getPrice());
        p.setArea(request.getArea());
        p.setAddress(request.getAddress());
        p.setAmenities(request.getAmenities());
        var district = districtRepository
                .findById(request.getDistrictId())
                .orElseThrow(() -> new ResourceNotFoundException("District not found"));
        var category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        p.setDistrict(district);
        p.setCategory(category);
        propertyRepository.save(p);

        // replace images if provided
        if (request.getImageUrls() != null) {
            imageRepository.deleteAll(p.getImages());
            List<PropertyImage> imgs = request.getImageUrls().stream()
                    .map(url ->
                            PropertyImage.builder().imageUrl(url).property(p).build())
                    .collect(Collectors.toList());
            imageRepository.saveAll(imgs);
            p.setImages(imgs);
        }
        return toResponse(p);
    }

    @Override
    public void deleteProperty(Long id) {
        Property p =
                propertyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        propertyRepository.delete(p);
    }

    @Override
    public PropertyResponse getProperty(Long id) {
        Property p =
                propertyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        return toResponse(p);
    }

    @Override
    public List<PropertyResponse> search(
            String keyword, Long districtId, Long categoryId, Long minPrice, Long maxPrice) {
        // Simple dynamic search using repository (can be replaced by Specification)
        var specs = (Specification<Property>) (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isBlank()) {
                String pattern = "%" + keyword.toLowerCase() + "%";

                Predicate titleMatch = cb.like(cb.lower(root.get("title")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                Predicate addressMatch = cb.like(cb.lower(root.get("address")), pattern);

                predicates.add(cb.or(titleMatch, descMatch, addressMatch));
            }

            if (districtId != null) {
                predicates.add(cb.equal(root.get("district").get("id"), districtId));
            }

            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }

            if (minPrice != null) {
                predicates.add(cb.ge(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.le(root.get("price"), maxPrice));
            }

            predicates.add(cb.equal(root.get("status"), 1));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
        var list = propertyRepository.findAll(specs);
        return list.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private PropertyResponse toResponse(Property p) {
        var images = p.getImages() == null
                ? List.<PropertyImageResponse>of()
                : p.getImages().stream()
                        .map(img -> PropertyImageResponse.builder()
                                .id(img.getId())
                                .imageUrl(img.getImageUrl())
                                .build())
                        .collect(Collectors.toList());
        var owner = UserBasicResponse.builder()
                .id(p.getOwner().getId())
                .username(p.getOwner().getUsername())
                .fullName(p.getOwner().getFullName())
                .phone(p.getOwner().getPhone())
                .email(p.getOwner().getEmail())
                .build();
        var district = DistrictResponse.builder()
                .id(p.getDistrict().getId())
                .name(p.getDistrict().getName())
                .build();
        var category = CategoryResponse.builder()
                .id(p.getCategory().getId())
                .name(p.getCategory().getName())
                .build();
        return PropertyResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(p.getPrice())
                .area(p.getArea())
                .address(p.getAddress())
                .amenities(p.getAmenities())
                .status(p.getStatus())
                .owner(owner)
                .district(district)
                .category(category)
                .images(images)
                .build();
    }
}
