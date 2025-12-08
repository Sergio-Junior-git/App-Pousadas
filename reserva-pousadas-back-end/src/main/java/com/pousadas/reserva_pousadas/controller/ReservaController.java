package com.pousadas.reserva_pousadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pousadas.reserva_pousadas.model.Quartos;
import com.pousadas.reserva_pousadas.model.Reserva;
import com.pousadas.reserva_pousadas.model.User;
import com.pousadas.reserva_pousadas.service.QuartosService;
import com.pousadas.reserva_pousadas.service.ReservaService;
import com.pousadas.reserva_pousadas.service.UserService;

@RestController
@RequestMapping("/reservas")
@CrossOrigin("*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;
    @Autowired 
    private UserService userService;
    @Autowired
    private QuartosService quartosService;

    @GetMapping
    public List<Reserva> listarReservas() {
        return reservaService.listarTodasReservas();
    }

    @GetMapping("/{id}")
    public Reserva buscarIdReserva(@PathVariable Long id) {
        return reservaService.buscarPorIdReservas(id);
    }

    @GetMapping("/id/{userId}")
    // ADICIONE A ANOTAÇÃO DE VOLTA
    @PreAuthorize("#userId == authentication.principal.userId") 
    public List<Reserva> buscarReservasPorUsuario(@PathVariable Long userId) {
       // O método precisa chamar a camada de serviço
       return reservaService.buscarReservasPorUsuario(userId);
    }
    

    @PostMapping
    public ResponseEntity<Reserva> criarReserva(@RequestBody Reserva reserva) {
    try {
        // 1. Obter o ID do Quarto e buscar a entidade completa
        Long quartoId = reserva.getQuarto().getQuartosId();
        
        // Assumindo que seu QuartosService tem um método que aceita Long.
        // Se o seu QuartosService.buscarPorIdQuartos() ainda usa Integer, use:
        // Quartos quartoExistente = quartosService.buscarPorIdQuartos(quartoId.intValue());
        
        // Caso seu QuartosService tenha sido corrigido para aceitar Long:
        Quartos quartoExistente = quartosService.buscarPorIdQuartos(quartoId); 

        // 2. Obter o ID do Usuário e buscar a entidade completa
        // CORREÇÃO: O getter é getUserId() no seu User Model.
        Long usuarioId = reserva.getUsuario().getUserId(); 
        
        // CORREÇÃO: Usando o novo método buscarPorId(Long)
        User usuarioExistente = userService.buscarPorId(usuarioId); 
        
        if (quartoExistente == null || usuarioExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 3. Atualizar a reserva com as entidades gerenciadas
        reserva.setQuarto(quartoExistente);
        reserva.setUsuario(usuarioExistente);
        
        // 4. Salvar a reserva
        Reserva novaReserva = reservaService.salvarReservas(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReserva);

    } catch (RuntimeException e) {
        // Trata a exceção de conflito de datas lançada pelo Service
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null); 
    }
}

    @DeleteMapping("/{id}")
    public void deletarReserva(@PathVariable Long id) {
        reservaService.deletarReservas(id);
    }
}
