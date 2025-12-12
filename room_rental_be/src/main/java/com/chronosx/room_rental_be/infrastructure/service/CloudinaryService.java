package com.chronosx.room_rental_be.infrastructure.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(CloudinaryConfig cfg) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cfg.cloudName,
                "api_key", cfg.apiKey,
                "api_secret", cfg.apiSecret));
    }

    public String upload(MultipartFile file, String folder) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folder));
        return (String) uploadResult.get("secure_url");
    }

    public void deleteByUrl(String url) {
        // Optional: implement by extracting public_id then cloudinary.uploader().destroy(public_id, ...)
    }
}
