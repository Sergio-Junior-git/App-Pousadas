package com.pousadas.reserva_pousadas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
    public List<Pousada> buscarPorCidade(String cidade) {
        // Encontra todas as pousadas onde o nome da cidade contenha a string fornecida (ignorando maiúsculas/minúsculas)
        return pousadaRepo.findByCidadeContainingIgnoreCase(cidade);
    }

    public Pousada salvarPousadas(Pousada pousada) {
        return pousadaRepo.save(pousada);
    }

    public void deletarPousadas(Long id) {
        pousadaRepo.deleteById(id);
    }


}
