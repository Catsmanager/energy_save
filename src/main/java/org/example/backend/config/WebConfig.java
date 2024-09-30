package org.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 설정 적용
                .allowedOrigins(
                        "http://localhost:3000" // 로컬 개발 서버 URL
                        //   "https://d5f6-210-183-98-25.ngrok-free.app" // ngrok URL
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("Authorization", "Content-Type") // 실제 사용되는 헤더만 허용
                .allowCredentials(true); // 쿠키를 사용할 경우 필요
    }
}
