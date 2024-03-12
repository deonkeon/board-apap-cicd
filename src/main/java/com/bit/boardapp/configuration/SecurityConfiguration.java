package com.bit.boardapp.configuration;

import com.bit.boardapp.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
// @EnableWebSecurity: SpringSecurity의 FilterChain을 구성하기 위한 어노테이션
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // 비밀번호 암호화 객체 bean 객체로 등록
    // 비밀번호 암호화와 UsernamePassworToken의 비밀번호와 CustomUserDetails 객체의 비밀번호를 비교하기 위한 passwordEncoder 객체 생성
    // 암호화된 비밀번호는 다시는 복호화할 수 없다.
    // PasswordEncoder에 있는 matches(암호화되지 않은 비밀번호, 암호화된 비밀번호)메소드를 이용해서 값을 비교한다. 일치하면 true, 일치하지 않으면 false
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SpringSecurity의 FilterChain을 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                //WebMvcConfiguration에서 설정해놨기 때문에 빈 상태로 설정
                .cors(httpSecurityCorsConfigurer -> {

                })
                .csrf(AbstractHttpConfigurer::disable)
                //토큰방식으로 인증처리를 하기 때문에 basic 인증방식 비활성화
                .httpBasic(AbstractHttpConfigurer::disable)
                //토큰을 사용하기 때문에 세션 비활성화
                .sessionManagement(httpSecuritySessionManagementConfigurer -> {
                    httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> {
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/", "/member/**").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/favicon.ico").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/manifest.json").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/asset-manifest.json").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/robots.txt").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/index.html").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/static/**").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/images/**").permitAll();
                    // "ROLE_" 가 앞에 포함되어있는데 자동으로 빠짐
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/board/**").hasAnyRole("ADMIN", "USER");
                    authorizationManagerRequestMatcherRegistry.requestMatchers("admin/**").hasRole("ADMIN");
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/user/login").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/user/join").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/user/id-check").permitAll();
                    // 이외 접근은 인증된 사용자만 접근가능
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/app/**").permitAll();
                    authorizationManagerRequestMatcherRegistry.anyRequest().authenticated();
                })
                // Filter 등록
                // cosrFilter 동작 후 jwtAuthenticationFilter가 동작
                .addFilterAfter(jwtAuthenticationFilter, CorsFilter.class)
                .build();
    }
}
