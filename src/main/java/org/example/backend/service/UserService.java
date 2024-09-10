package org.example.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.backend.config.jwt.JwtFactory;
import org.example.backend.domain.User; // 도메인 클래스의 패키지 경로를 확인하여 수정하세요.
import org.example.backend.dto.auth.LoginRequestDTO;
import org.example.backend.dto.auth.UserDTO;
import org.example.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtFactory jwtFactory;

    // 주어진 이메일이 이미 존재하는지 확인하는 메소드
    public boolean checkIfEmailExists(String emailId) {
        return userRepository.existsByEmailId(emailId);
    }

    // 사용자를 생성하는 메소드
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByEmailId(userDTO.getEmailId())) {
            throw new RuntimeException("Email already exists");
        }
        // 비밀번호를 암호화합니다.
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        // User 객체를 생성합니다.
        User user = User.builder()
                .emailId(userDTO.getEmailId())
                .username(userDTO.getUsername())
                .password(encodedPassword) // 암호화된 비밀번호 설정
                .build();
        // 생성된 User 객체를 데이터베이스에 저장합니다.
        userRepository.save(user);
        // 생성된 사용자의 DTO를 반환합니다.
        return userDTO;
    }

    // 사용자 로그인 메소드
    public String loginUser(LoginRequestDTO loginRequestDTO) {
        // 사용자 찾기
        User user = userRepository.findByEmailId(loginRequestDTO.getEmailId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 비밀번호 확인
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // JWT 생성
        return jwtFactory.createToken(user);
    }
}