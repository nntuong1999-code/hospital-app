package com.hms.user.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SercurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
           http.csrf().disable().authorizeHttpRequests(auth->auth.requestMatchers(request->"SECRET_KEY".equals(request.getHeader("X-Secrey-Key"))).permitAll().anyRequest().denyAll());
    //     // Cho phép tất cả request
    //     .authorizeHttpRequests(auth -> auth
    //         .requestMatchers("/**").permitAll()
    //         .anyRequest().authenticated()
    //     )

    //     // Tắt CSRF (thường dùng cho REST API)
    //     .csrf(csrf -> csrf.disable());

     return http.build();

    }
}
