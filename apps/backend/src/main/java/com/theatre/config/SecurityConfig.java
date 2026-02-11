package com.theatre.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // Désactivation CSRF pour API REST
      .formLogin(form -> form.disable()) // Désactivation du formulaire de login
      .httpBasic(basic -> basic.disable()) // Désactivation HTTP Basic Auth
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        // Swagger et OpenAPI - accès public
        .requestMatchers(
          "/v3/api-docs/**",
          "/swagger-ui/**",
          "/swagger-ui.html",
          "/swagger-resources/**",
          "/webjars/**"
        ).permitAll()

        // Endpoints publics
        .requestMatchers(
          "/api/spectacles/**",
          "/api/reservations/**"
        ).permitAll()

        // Endpoints admin protégés
        .requestMatchers("/api/admin/**").hasRole("ADMIN")

        // Tout le reste nécessite une authentification
        .anyRequest().authenticated()
      );

    return http.build();
  }
}

