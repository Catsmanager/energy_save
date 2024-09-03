package org.example.backend.repository;

import org.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // 이메일 ID로 존재 여부를 확인하는 메소드
    boolean existsByEmailId(String emailId);

    // 이메일 ID로 사용자 조회 메소드
    Optional<User> findByEmailId(String emailId);
}