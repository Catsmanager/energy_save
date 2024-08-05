package org.example.backend.service;

import jakarta.transaction.Transactional;
import org.example.backend.domain.User;
import org.example.backend.dto.UserDTO;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    // 데이터베이스와 상호작용하는 기능을 제공합니다.
    private UserRepository userRepository;

    @Autowired
    // 비밀번호 암호화에 사용됩니다.
    private BCryptPasswordEncoder passwordEncoder;
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
        userRepository.save(user); // UserRepository를 사용하여 User 객체를 데이터베이스에 저장합니다.
        // 생성된 사용자의 DTO를 반환합니다.
        return userDTO; // 사용자 DTO를 반환하여 클라이언트에게 응답합니다.
    }
}