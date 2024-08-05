package org.example.backend.repository;

import org.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmailId(String emailId);
    Optional<User> findByEmailId(String emailId);
}