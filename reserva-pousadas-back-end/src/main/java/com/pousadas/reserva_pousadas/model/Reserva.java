package com.pousadas.reserva_pousadas.model;

import java.time.LocalDate;

import com.pousadas.reserva_pousadas.model.Enum.StatusReserva;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long reservaId;

    @Column(name = "data_checkin")
    private LocalDate dataCheckin;

    @Column(name = "data_checkout")
    private LocalDate dataCheckout;

    @Enumerated(EnumType.STRING)
    private StatusReserva status = StatusReserva.PENDENTE;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "quarto_id", nullable = false)
    private Quartos quarto;

    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }

    public LocalDate getDataCheckin() {
        return dataCheckin;
    }

    public void setDataCheckin(LocalDate dataCheckin) {
        this.dataCheckin = dataCheckin;
    }

    public LocalDate getDataCheckout() {
        return dataCheckout;
    }

    public void setDataCheckout(LocalDate dataCheckout) {
        this.dataCheckout = dataCheckout;
    }

    public StatusReserva getStatus() {
        return status;
    }

    public void setStatus(StatusReserva status) {
        this.status = status;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public Quartos getQuarto() {
        return quarto;
    }

    public void setQuarto(Quartos quarto) {
        this.quarto = quarto;
    }

    
}
