package com.kh.crud.config;

import com.kh.crud.global.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // ✅ CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 서버에서 세션을 생성하지도 않고, 기존 세션을 사용하지도 않겠다라고 설정한 것
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ✅ CSRF 비활성화 (H2 콘솔 필수) : 사이트 간 요청 위조 보호 기능을 비활성화
                .csrf(csrf -> csrf.disable())

                // ✅ H2 콘솔 iframe 허용하기 위해
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // ✅ 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/posts/**",
                                "/api/likes/**",
                                "/h2-console/**"   // ⭐ 이게 핵심
                        ).permitAll()

                        //모든 OPTIONS 요청은 인증 없이 허용
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // OPTIONS 요청 : 브라우저가 보내는 “이 요청 보내도 되나요?” 확인용 요청
                        .anyRequest().authenticated()
                )

                //  Spring Security 기본 로그인 필터보다 JWT 필터를 먼저 실행하도록 하는 코드
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    // Spring Security에서 다른 도메인/포트에서 보내는 요청을 브라우저가 막지 않도록 허용하고, 토큰 같은 인증 정보도 같이 보내도록 설정한 것
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // 허용할 도메인을 지정
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        // 어떤 방식의 HTTP 요청을 허용할지 정한다.
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // 클라이언트가 요청 시 보낼 수 있는 헤더 정보를 제한한다.
        config.setAllowedHeaders(List.of("*"));
        // 쿠키나 인증 헤더(Authorization)를 포함한 요청을 허용할지 결정한다.
        config.setAllowCredentials(true);
        // 브라우저가 이 설정값을 얼마나 오랫동안 캐시(기억)할지 초 단위로 지정한다.
        config.setMaxAge(3600L);


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // 위 설정들을 어떤 URL 경로에 적용할지 정한다.
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
