package org.example.backend.dto;

import org.springframework.web.multipart.MultipartFile;

public class OCRDTO {
    private MultipartFile image;

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
