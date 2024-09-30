package org.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.backend.config.jwt.JwtBlackList;
import org.example.backend.dto.auth.EmailCheckRequest;
import org.example.backend.dto.auth.EmailCheckResponse;
import org.example.backend.dto.auth.LoginRequestDTO;
import org.example.backend.dto.auth.UserDTO;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtBlackList jwtBlacklist;

    // 이메일 중복 체크를 위한 엔드포인트
    @PostMapping("/check/email")
    public ResponseEntity<EmailCheckResponse> checkEmail(@RequestBody EmailCheckRequest request) {
        // 이메일 존재 여부를 확인
        boolean exists = userService.checkIfEmailExists(request.getEmailId());
        // 결과를 담은 EmailCheckResponse 객체를 반환
        return ResponseEntity.ok(new EmailCheckResponse(exists));
    }

    // 사용자 등록을 위한 엔드포인트
    @PostMapping("/signup")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        // 사용자 생성 로직을 호출하여 사용자 생성
        UserDTO createdUser = userService.createUser(userDTO);
        // 생성된 사용자 정보를 반환
        return ResponseEntity.ok(createdUser);
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequestDTO loginRequestDTO) {
        String jwtToken = userService.loginUser(loginRequestDTO);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        String token = extractToken(request);
        if (token != null) {
            jwtBlacklist.blacklistToken(token); // 블랙리스트에 추가
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 제거
        }
        return null; // 토큰이 없을 경우
    }

    /*
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDTO loginRequestDTO) {
        String jwtToken = userService.loginUser(loginRequestDTO);

        return ResponseEntity.ok(jwtToken);
    }
    */
}
