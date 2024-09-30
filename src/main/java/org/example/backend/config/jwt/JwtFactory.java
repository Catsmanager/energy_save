package org.example.backend.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.backend.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Getter
@Component
public class JwtFactory {

    private final JwtProperties jwtProperties;

    @Autowired
    public JwtFactory(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    } // JWT와 관련된 설정(예: 비밀 키, 발행자, 만료 시간 등)을 관리하는 설정 클래스입니다.

    public String createToken(User user) {
        // User 객체를 기반으로 JWT를 생성합니다.
        return Jwts.builder()
                .setSubject(user.getEmailId()) // 일반적으로 사용자의 이메일이나 ID와 같은 고유 식별자를 설정
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // 헤더에 JWT 타입을 설정
                .setIssuer(jwtProperties.getIssuer()) // 발행자를 설정
                .setIssuedAt(new Date()) // 토큰 발행 시간을 설정
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationTime())) // 토큰 만료 시간을 설정
                .claim("username", user.getUsername()) // JWT에 추가적인 클레임(데이터)으로 사용자의 이름을 추가
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey()) // 알고리즘을 사용해 JWT에 서명
                .compact(); // JWT를 생성하고, 문자열 형태로 반환
    }

    public boolean validToken(String token) { //  전달된 JWT 토큰이 유효한지 확인하는 메소드
        try {
            Jwts.parser() // JWT 파서를 생성
                    .setSigningKey(jwtProperties.getSecretKey()) // JWT 서명에 사용된 비밀 키를 설정
                    .parseClaimsJws(token); // 전달된 JWT 토큰을 파싱하여 유효성을 검증
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserId(String token) { // JWT에서 사용자 ID 또는 이메일(토큰의 주제)을 추출하여 반환
        Claims claims = Jwts.parser()// JWT 파서를 생성
                .setSigningKey(jwtProperties.getSecretKey())// 서명에 사용된 비밀 키를 설정
                .parseClaimsJws(token) // JWT를 파싱하여 클레임을 추출
                .getBody();
        return claims.getSubject(); // Returns email or user ID
    }

    public String getUsername(String token) { // JWT에서 "username" 클레임을 추출하여 반환
        Claims claims = Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
        return claims.get("username", String.class); // Retrieve additional claim
    }
}