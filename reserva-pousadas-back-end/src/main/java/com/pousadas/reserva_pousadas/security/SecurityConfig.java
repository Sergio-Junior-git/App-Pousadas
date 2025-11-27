package com.pousadas.reserva_pousadas.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                // Liberado (público)
                .requestMatchers("/auth/login").permitAll()
                .requestMatchers("/usuarios").permitAll()
                .requestMatchers("/auth/register").permitAll() // se quiser cadastro público
                .requestMatchers("/pousadas").permitAll() // se quiser tudo público, remover depois

                // Tudo restante precisa de token:
                .anyRequest().authenticated()

                // Qualquer coisa ta liberado, não vai precisar de token
                // .anyRequest().permitAll()
            )
            .sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
