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

import com.pousadas.reserva_pousadas.model.Quartos;
import com.pousadas.reserva_pousadas.service.QuartosService;

@RestController
@RequestMapping("/quartos")
@CrossOrigin("*")
public class QuartosController {

    @Autowired
    private QuartosService quartosService;

    @GetMapping
    public List<Quartos> listarQuartos() {
        return quartosService.listarTodosQuartos();
    }

    @GetMapping("/{id}")
    public Quartos buscarIdQuartos(@PathVariable Long id) {
        return quartosService.buscarPorIdQuartos(id);
    }

    @PostMapping
    public Quartos criarQuartos(@RequestBody Quartos quartos) {
        return quartosService.salvarQuartos(quartos);
    }

    @DeleteMapping("/{id}")
    public void deletarQuarto(@PathVariable Long id) {
        quartosService.deletarQuartos(id);
    }

}
