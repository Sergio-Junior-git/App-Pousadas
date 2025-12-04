package com.pousadas.reserva_pousadas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pousadas.reserva_pousadas.model.Pousada;

public interface PousadaRepo extends JpaRepository<Pousada, Long> {
    
    List<Pousada> findByCidadeContainingIgnoreCase(String cidade);
}   
