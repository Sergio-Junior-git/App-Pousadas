package com.pousadas.reserva_pousadas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.pousadas.reserva_pousadas.model.Pousada;
import com.pousadas.reserva_pousadas.repository.PousadaRepo;

@Service
public class PousadasService {
    
    @Autowired
    private PousadaRepo pousadaRepo;

    public List<Pousada> listarTodasPousadas() {
        return pousadaRepo.findAll();
    }

    public Pousada buscarPorIdPousadas(Long id) {
        return pousadaRepo.findById(id).orElse(null);
    }

    public Pousada salvarPousadas(Pousada pousada) {
        return pousadaRepo.save(pousada);
    }

    public void deletarPousadas(Long id) {
        pousadaRepo.deleteById(id);
    }


}
