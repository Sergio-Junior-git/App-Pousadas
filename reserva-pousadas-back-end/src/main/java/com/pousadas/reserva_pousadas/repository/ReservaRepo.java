package com.pousadas.reserva_pousadas.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pousadas.reserva_pousadas.model.Reserva;

public interface ReservaRepo extends JpaRepository<Reserva, Long> {

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
           "FROM Reserva r " +
           "WHERE r.quarto.quartosId = :quartoId " +
           "AND (r.dataCheckin <= :dataCheckout AND r.dataCheckout >= :dataCheckin)")
    boolean existsByQuartoIdAndPeriodo(Long quartoId, LocalDate dataCheckin, LocalDate dataCheckout);
}

