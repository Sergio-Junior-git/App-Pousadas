package com.pousadas.reserva_pousadas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pousadas.reserva_pousadas.model.User;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

}
