package com.pousadas.reserva_pousadas.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pousadas.reserva_pousadas.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String SECRET_KEY = "MINHA_CHAVE_SECRETA_SUPER_SEGURA_256_BITS_AQUI_TROCAR";

    public String gerarToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getTipoUsuario().name());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extrairEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean tokenValido(String token, User user) {
        String email = extrairEmail(token);
        return email.equals(user.getEmail()) && !tokenExpirado(token);
    }

    private boolean tokenExpirado(String token) {
        Date exp = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return exp.before(new Date());
    }
}
