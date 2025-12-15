package com.chronosx.room_rental_be.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chronosx.room_rental_be.domain.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {}
