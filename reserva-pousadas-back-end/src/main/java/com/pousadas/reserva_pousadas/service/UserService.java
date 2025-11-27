package com.pousadas.reserva_pousadas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.pousadas.reserva_pousadas.model.User;
import com.pousadas.reserva_pousadas.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<User> listarTodosUsuarios() {
        return userRepo.findAll();
    }

    public User buscarPorIdUsuarios(@PathVariable Integer id) {
        return userRepo.findById(id).orElse(null);
    }

    public User criarUsuarios(@RequestBody User usuario) {
        return userRepo.save(usuario);
    }

    public void deletarUsuarios(@PathVariable Integer id) {
        userRepo.deleteById(id);
    }

    public User buscarPorEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public User atualizarUsuarios(Integer id, User dadosAtualizados) {
    User user = userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + id));

    user.setNomeUsuario(dadosAtualizados.getNomeUsuario());
    user.setEmail(dadosAtualizados.getEmail());
    user.setTelefone(dadosAtualizados.getTelefone());
    user.setTipoUsuario(dadosAtualizados.getTipoUsuario());

    // Atualizar senha? Opcional.
    if (dadosAtualizados.getSenha() != null && !dadosAtualizados.getSenha().isEmpty()) {
        user.setSenha(dadosAtualizados.getSenha());
    }

    return userRepo.save(user);
}
}
