package com.pousadas.reserva_pousadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pousadas.reserva_pousadas.model.Pousada;
import com.pousadas.reserva_pousadas.model.User;
import com.pousadas.reserva_pousadas.service.PousadasService;
import com.pousadas.reserva_pousadas.service.UserService;

@RestController
@RequestMapping("/pousadas")
@CrossOrigin("*")
public class PousadaController {

    @Autowired
    private PousadasService pousadasService;

    @Autowired
    private UserService userService;

    @GetMapping
        public List<Pousada> listarPousadas(
            // Adiciona um RequestParam opcional para filtrar por cidade
            @RequestParam(required = false) String cidade
        ) {
            if (cidade != null && !cidade.trim().isEmpty()) {
                // Novo método para buscar por cidade
                return pousadasService.buscarPorCidade(cidade); 
            }
            // Retorna todas se nenhum filtro for fornecido
            return pousadasService.listarTodasPousadas();
        }

    @GetMapping("/{id}")
    public ResponseEntity<Pousada> buscarIdPousada(@PathVariable Long id) {
        Pousada pousada = pousadasService.buscarPorIdPousadas(id);

        if (pousada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pousada);
}

    @PostMapping
    public ResponseEntity<Pousada> criarPousada(@RequestBody Pousada pousada) {
        User usuarioLogado = userService.buscarPorEmail(pousada.getUsuario().getEmail());

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        pousada.setUsuario(usuarioLogado);
        Pousada nova = pousadasService.salvarPousadas(pousada);
    
        return ResponseEntity.status(HttpStatus.CREATED).body(nova);
    }

    @DeleteMapping("/{id}")
    public void deletarPousada(@PathVariable Long id) {
        pousadasService.deletarPousadas(id);
    }

    @PutMapping("/{id}")
    public Pousada atualizarPousada(@PathVariable Long id, @RequestBody Pousada pousada) {
        Pousada existente = pousadasService.buscarPorIdPousadas(id);
        if (existente == null) return null; // ou lançar exceção
        existente.setNome(pousada.getNome());
        existente.setEndereco(pousada.getEndereco());
        existente.setCidade(pousada.getCidade());
        existente.setEstado(pousada.getEstado());
        existente.setDescricaoPousada(pousada.getDescricaoPousada());
        return pousadasService.salvarPousadas(existente);
    }

}
