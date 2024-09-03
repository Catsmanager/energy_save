package org.example.backend.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ImageAIController {

    private final String AI_SERVER_URL = "http://localhost:5000/predict"; // Flask 서버 URL

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestBody Map<String, String> request) {
        System.out.println("이미지 받음");

        String base64Image = request.get("image");
        if (base64Image == null) {
            System.out.println("No image provided in the request.");
            return ResponseEntity.badRequest().body(null);
        }

        // Flask 서버가 Base64 문자열을 기대하므로 변환 없이 전송
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("image", base64Image);

        // RestTemplate 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        System.out.println("Sending request to AI server: " + AI_SERVER_URL);
        ResponseEntity<Map> response;
        try {
            response = restTemplate.exchange(AI_SERVER_URL, HttpMethod.POST, requestEntity, Map.class);
            System.out.println("Received response from AI server: " + response.getBody());
        } catch (Exception e) {
            System.out.println("Error communicating with AI server: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.ok(response.getBody());
    }
}
