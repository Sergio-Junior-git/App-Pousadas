package com.pousadas.reserva_pousadas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pousadas.reserva_pousadas.model.Quartos;
import com.pousadas.reserva_pousadas.repository.QuartosRepo;

@Service
public class QuartosService {

    @Autowired
    private QuartosRepo quartosRepo;

    public List<Quartos> listarTodosQuartos() {
        return quartosRepo.findAll();
    }

    public Quartos buscarPorIdQuartos(Integer id) {
        return quartosRepo.findById(id).orElse(null);
    }

    public Quartos salvarQuartos(Quartos quarto) {
        return quartosRepo.save(quarto);
    }

    public void deletarQuartos(Integer id) {
        quartosRepo.deleteById(id);
    }
}
