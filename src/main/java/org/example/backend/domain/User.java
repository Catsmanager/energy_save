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

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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

    // 권한 정보를 반환하는 메서드
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 예를 들어, 'USER' 역할을 반환하도록 설정
        // 필요에 따라 역할을 추가하거나 변경할 수 있습니다.
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
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
