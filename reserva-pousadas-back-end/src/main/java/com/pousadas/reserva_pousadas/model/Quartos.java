package com.pousadas.reserva_pousadas.model;

import java.util.List;

import com.pousadas.reserva_pousadas.model.Enum.TipoQuarto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "quartos")
public class Quartos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long quartosId;

    @Column(name = "numero", length = 20)
    private String numeroQuartos;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoQuarto tipo;

    @Column(name = "preco")
    private Double precoQuartos;

    @Column(name = "capacidade")
    private Integer capacidade;

    @ManyToOne
    @JoinColumn(name = "pousada_id", nullable = false)
    private Pousada pousada;

    @OneToMany(mappedBy = "quarto", cascade = CascadeType.ALL)
    private List<Reserva> reservas;

    public Long getQuartosId() {
        return quartosId;
    }

    public void setQuartosId(Long quartosId) {
        this.quartosId = quartosId;
    }

    public String getNumeroQuartos() {
        return numeroQuartos;
    }

    public void setNumeroQuartos(String numeroQuartos) {
        this.numeroQuartos = numeroQuartos;
    }

    public TipoQuarto getTipo() {
        return tipo;
    }

    public void setTipo(TipoQuarto tipo) {
        this.tipo = tipo;
    }

    public Double getPrecoQuartos() {
        return precoQuartos;
    }

    public void setPrecoQuartos(Double precoQuartos) {
        this.precoQuartos = precoQuartos;
    }

    public Integer getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Integer capacidade) {
        this.capacidade = capacidade;
    }

    public Pousada getPousada() {
        return pousada;
    }

    public void setPousada(Pousada pousada) {
        this.pousada = pousada;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    
}
