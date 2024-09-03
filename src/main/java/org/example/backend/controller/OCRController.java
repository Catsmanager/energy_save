package org.example.backend.controller;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
public class OCRController {

    @PostMapping("/api/ocr")
    public ResponseEntity<String> handleImageUpload(@RequestParam("image") MultipartFile imageFile) {
        try {
            // 이미지 파일을 BufferedImage로 읽어들입니다.
            byte[] imageBytes = imageFile.getBytes();
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageBytes));

            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("C:/Tesseract-OCR/tessdata"); // tessdata 경로 설정
            tesseract.setLanguage("kor+eng"); // 한글과 영어 인식
            //System.out.println("TESSDATA_PREFIX: " + System.getenv("TESSDATA_PREFIX"));

            // OCR 처리
            String result = tesseract.doOCR(image);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to process image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
