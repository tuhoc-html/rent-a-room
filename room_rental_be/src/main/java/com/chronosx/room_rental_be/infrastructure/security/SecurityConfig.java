package com.chronosx.room_rental_be.infrastructure.security;

<<<<<<< HEAD
import java.util.Arrays;
import java.util.List;

<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> nhanh-cua-kiet
=======
import lombok.RequiredArgsConstructor;
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
=======
>>>>>>> nhanh-cua-kiet
=======
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.chronosx.room_rental_be.infrastructure.service.impl.UserDetailsServiceImpl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

<<<<<<< HEAD
<<<<<<< HEAD
import com.chronosx.room_rental_be.infrastructure.service.impl.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;

    private final String[] AUTH_WHITELIST = {
        "/api/auth/**", "/h2-console/**", "/api/properties", "/api/properties/*",
    };
=======
import com.chronosx.room_rental_be.infrastructure.service.UserDetailsServiceImpl;
=======
import java.util.Arrays;
import java.util.List;
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
<<<<<<< HEAD
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
>>>>>>> nhanh-cua-kiet
=======

    private final UserDetailsServiceImpl userDetailsService;

    private final String[] AUTH_WHITELIST = {
            "/api/auth/**", "/h2-console/**", "/api/properties", "/api/properties/*",
    };
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
<<<<<<< HEAD
<<<<<<< HEAD
        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth.requestMatchers(AUTH_WHITELIST)
=======
        http.csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**", "/h2-console/**")
>>>>>>> nhanh-cua-kiet
=======
        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth.requestMatchers(AUTH_WHITELIST)
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .userDetailsService(userDetailsService)
                .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        // For h2-console if needed
<<<<<<< HEAD
<<<<<<< HEAD
        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
=======
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
>>>>>>> nhanh-cua-kiet
=======
        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
>>>>>>> de54818bd43b7613d9d9b2c1c4b5fdf2c6373379

        http.cors(httpSecurityCorsConfigurer -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
            corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            corsConfiguration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
            corsConfiguration.setExposedHeaders(List.of("x-auth-token"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", corsConfiguration);
            httpSecurityCorsConfigurer.configurationSource(source);
        });

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration conf) throws Exception {
        return conf.getAuthenticationManager();
    }
}
