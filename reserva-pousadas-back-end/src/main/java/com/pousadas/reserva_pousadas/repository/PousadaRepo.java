package com.pousadas.reserva_pousadas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pousadas.reserva_pousadas.model.Pousada;

public interface PousadaRepo extends JpaRepository<Pousada, Long> {

}
