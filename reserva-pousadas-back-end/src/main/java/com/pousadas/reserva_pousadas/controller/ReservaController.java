package com.pousadas.reserva_pousadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pousadas.reserva_pousadas.model.Reserva;
import com.pousadas.reserva_pousadas.service.ReservaService;

@RestController
@RequestMapping("/reservas")
@CrossOrigin("*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> listarReservas() {
        return reservaService.listarTodasReservas();
    }

    @GetMapping("/{id}")
    public Reserva buscarIdReserva(@PathVariable Integer id) {
        return reservaService.buscarPorIdReservas(id);
    }

    @PostMapping
    public Reserva criarReserva(@RequestBody Reserva reserva) {
        return reservaService.salvarReservas(reserva);
    }

    @DeleteMapping("/{id}")
    public void deletarReserva(@PathVariable Integer id) {
        reservaService.deletarReservas(id);
    }
}
