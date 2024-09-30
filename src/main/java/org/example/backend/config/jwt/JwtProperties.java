package org.example.backend.config.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String issuer;          // JWT 발급자
    private String secretKey;       // JWT 비밀 키
    private long expirationTime;    // JWT 만료 시간 (밀리초 단위)
}