package com.chronosx.room_rental_be.infrastructure.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Value("${cloudinary.cloud_name}")
    public String cloudName;

    @Value("${cloudinary.api_key}")
    public String apiKey;

    @Value("${cloudinary.api_secret}")
    public String apiSecret;
}
