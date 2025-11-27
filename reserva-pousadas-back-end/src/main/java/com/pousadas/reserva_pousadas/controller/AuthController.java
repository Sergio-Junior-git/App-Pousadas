package com.pousadas.reserva_pousadas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pousadas.reserva_pousadas.DTOs.LoginRequest;
import com.pousadas.reserva_pousadas.DTOs.LoginResponse;
import com.pousadas.reserva_pousadas.DTOs.RegisterRequest;
import com.pousadas.reserva_pousadas.model.User;
import com.pousadas.reserva_pousadas.model.Enum.TipoUsuario;
import com.pousadas.reserva_pousadas.service.JwtService;
import com.pousadas.reserva_pousadas.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest login) {
        User user = userService.buscarPorEmail(login.getEmail());

        if (user == null || !user.getSenha().equals(login.getSenha())) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        String token = jwtService.gerarToken(user);
        return new LoginResponse(token, user);
    }

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {

    if (userService.buscarPorEmail(request.getEmail()) != null) {
        throw new RuntimeException("Email já está em uso.");
    }

    User novo = new User();
    novo.setNomeUsuario(request.getNomeUsuario());
    novo.setEmail(request.getEmail());
    novo.setSenha(request.getSenha()); // futuramente colocar hash
    novo.setTelefone(request.getTelefone());
    novo.setTipoUsuario(TipoUsuario.HOSPEDE);

    User salvo = userService.criarUsuarios(novo);

    String token = jwtService.gerarToken(salvo);
    return new LoginResponse(token, salvo);
}
}
