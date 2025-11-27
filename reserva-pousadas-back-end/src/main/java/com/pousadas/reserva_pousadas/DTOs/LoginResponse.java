package com.pousadas.reserva_pousadas.DTOs;

import com.pousadas.reserva_pousadas.model.User;

public class LoginResponse {
    private String token;
    private User usuario;

    public LoginResponse(String token, User usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() { return token; }
    public User getUsuario() { return usuario; }
}
