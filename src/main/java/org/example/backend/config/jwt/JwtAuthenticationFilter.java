package org.example.backend.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtFactory jwtFactory;
    private final JwtBlackList jwtBlacklist = new JwtBlackList(); // JwtBlacklist 인스턴스 생성

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) //  HTTP 요청을 가로채고 JWT를 검사하는 작업을 수행합니다.
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String token = httpRequest.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) { //  JWT 토큰은 일반적으로 "Bearer {token}" 형식으로 전달
            token = token.substring(7); // "Bearer " 부분을 제거하고 실제 토큰 값만 추출

            if (jwtFactory.validToken(token)) {
                String username = jwtFactory.getUserId(token); // 여기서 사용자 ID를 가져옵니다.
                //  객체를 생성하여 Spring Security의 인증 객체로 설정합니다. 여기서 ROLE_USER라는 단일 권한을 부여합니다.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            else {
                // 블랙리스트에 있는 경우, 예외 처리
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is blacklisted");
                return;
            }
        }

        chain.doFilter(request, response); // 필터 체인의 다음 필터를 호출하여, 요청이 계속 처리
    }
}



//@Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//        HttpServletResponse httpResponse = (HttpServletResponse) response;
//
//        String token = httpRequest.getHeader("Authorization");
//        if (token != null && token.startsWith("Bearer ")) {
//            token = token.substring(7);
//
//            if (jwtFactory.validToken(token) && !jwtBlacklist.isTokenBlacklisted(token)) {
//                String username = jwtFactory.getUserId(token);
//                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                        username, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
//
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            } else {
//                // 블랙리스트에 있는 경우, 예외 처리
//                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is blacklisted");
//                return;
//            }
//        }
//
//        chain.doFilter(request, response);
//    }
