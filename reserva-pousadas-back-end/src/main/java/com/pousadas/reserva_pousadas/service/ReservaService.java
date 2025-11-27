package com.pousadas.reserva_pousadas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pousadas.reserva_pousadas.model.Reserva;
import com.pousadas.reserva_pousadas.repository.ReservaRepo;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepo reservaRepo;

    public List<Reserva> listarTodasReservas() {
        return reservaRepo.findAll();
    }

    public Reserva buscarPorIdReservas(Integer id) {
        return reservaRepo.findById(id).orElse(null);
    }

    public Reserva salvarReservas(Reserva reserva) {
        boolean existeConflito = reservaRepo.existsByQuartoIdAndPeriodo(
                reserva.getQuarto().getQuartosId(),
                reserva.getDataCheckout(),
                reserva.getDataCheckin()
        );
        if (existeConflito) {
            throw new RuntimeException("O quarto já está reservado nesse período.");
        }
        return reservaRepo.save(reserva);
    }

    public void deletarReservas(Integer id) {
        reservaRepo.deleteById(id);
    }
}
