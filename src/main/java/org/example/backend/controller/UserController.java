package org.example.backend.controller;

import org.example.backend.dto.EmailCheckRequest;
import org.example.backend.dto.EmailCheckResponse;
import org.example.backend.dto.UserDTO;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    // UserService 인스턴스를 주입받음
    private final UserService userService;
    // 생성자 주입을 통해 UserService를 설정
    public UserController(UserService userService) {
        this.userService = userService;
    }
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
}
