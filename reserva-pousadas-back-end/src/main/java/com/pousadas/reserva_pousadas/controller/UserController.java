package com.pousadas.reserva_pousadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pousadas.reserva_pousadas.model.User;
import com.pousadas.reserva_pousadas.service.UserService;
                
@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> listarUsuarios() {
        return userService.listarTodosUsuarios();
    }

    @GetMapping("/{id}")
    public User buscarUsuario(@PathVariable Integer id) {
        return userService.buscarPorIdUsuarios(id);
    }

    @PostMapping
    public User criarUsuario(@RequestBody User user) {
        return userService.criarUsuarios(user);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Integer id) {
        userService.deletarUsuarios(id);
    }

    @PutMapping("/{id}")
        public User atualizarUsuario(@PathVariable Integer id, @RequestBody User user) {
        return userService.atualizarUsuarios(id, user);
    }
}
