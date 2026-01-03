package com.kh.crud.global.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtTokenProvider jwtTokenProvider;


    @Override

    // 요청 하나가 들어올 때마다 SecurityConfig에 의해 실행되는 보안 전용 입구 메서드
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //요청정보를 가지고 인증후, 인증이 완료되면 정보를 security에 저장

        try {
            //1. 요청정보에서 토큰 추출
            String token = getJwtFormRequest(request);

            //2. 토큰이 정상적인 토큰인지를 검증

            // 토큰이 “실제로 존재하는지” 확인
            if (StringUtils.hasText(token)) {
                Optional<Claims> claimsOpt = jwtTokenProvider.validateToken(token);


                // claimsOpt가 존재하면 true
                if (claimsOpt.isPresent()) {
                    String userId = jwtTokenProvider.getUserIdFromToken(token);
                    String role = jwtTokenProvider.getRoleFromToken(token);

                    //Security Context에 인증정보를 저장

                    // 권한 객체 생성 ( 이 사용자는 어떤 권한을 가진 사용자이다를 나타내기 위해)
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                    // 인증 객체 생성
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userId, null, Collections.singletonList(authority));

                    // 요청 부가정보 저장
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // SecurityContext에 접근해서 인증 정보 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            logger.error("JWT인증 에러", e);
        }

        // Controller로 요청이 넘어감
        filterChain.doFilter(request, response);

    }


    // 요청으로부터 JWT를 가져오는 함수
    private String getJwtFormRequest(HttpServletRequest request) {
       // HTTP 요청 헤더에서 Authorization 값을 가져온다
        String bearerToken = request.getHeader("Authorization");
        //  실제 글자가 있는지 확인   and  JWT 표준 헤더 형식인지 검사
        if(StringUtils.hasText(bearerToken) &&  bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
