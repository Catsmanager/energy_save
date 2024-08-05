package org.example.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor // Lombok 어노테이션으로 기본 생성자 자동 생성
@AllArgsConstructor // Lombok 어노테이션으로 모든 필드를 인수로 받는 생성자 자동 생성
@Builder // Lombok 어노테이션으로 빌더 패턴을 사용한 객체 생성
public class User implements UserDetails {

    @Id
    @Column(name = "email_id")
    private String emailId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Override
    // 사용자의 권한을 반환 (빈 리스트 반환하여 권한 없음)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    // 계정이 만료되지 않았음을 반환
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    // 계정이 잠기지 않았음을 반환
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    // 자격 증명이 만료되지 않았음을 반환
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    // 계정이 활성화되었음을 반환
    public boolean isEnabled() {
        return true;
    }
}
