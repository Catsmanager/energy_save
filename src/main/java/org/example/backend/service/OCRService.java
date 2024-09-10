package org.example.backend.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class OCRService {

    public String processImage(byte[] imageBytes) throws IOException, TesseractException {
        // 이미지 파일을 BufferedImage로 읽어들임
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageBytes));

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:/Tesseract-OCR/tessdata"); // tessdata 경로 설정
        tesseract.setLanguage("kor+eng"); // 한글과 영어 인식

        // OCR 처리
        return tesseract.doOCR(image);
    }
}
