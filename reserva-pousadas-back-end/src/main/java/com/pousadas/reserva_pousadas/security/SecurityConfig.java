package com.pousadas.reserva_pousadas.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean // <--- Adicione este Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Permite o seu frontend (Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        
        // 2. Permite todos os cabeçalhos (incluindo 'Authorization')
        configuration.setAllowedHeaders(Arrays.asList("*")); 
        
        // 3. Permite os métodos que você usa (GET, POST, PUT, DELETE, OPTIONS)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 4. Permite cookies e tokens de autenticação (Importante para o JWT)
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todas as rotas
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(auth -> auth
            // 1. CORREÇÃO DE CORS: Permite a requisição OPTIONS (preflight) para todos os caminhos
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // <--- ADICIONE ESTA LINHA
            
            // Liberado (público)
            .requestMatchers("/auth/login").permitAll()
            .requestMatchers("/usuarios").permitAll()
            .requestMatchers("/auth/register").permitAll()
            .requestMatchers("/pousadas/**").permitAll()
            .requestMatchers("/quartos/**").permitAll()
            
            // Tudo restante precisa de token:
            .anyRequest().authenticated()
        )
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
    }
}
