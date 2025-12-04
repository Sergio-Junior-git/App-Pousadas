package com.pousadas.reserva_pousadas.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pousadas")
public class Pousada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "endereco", length = 255, nullable = false)
    private String endereco;

    @Column(name = "cidade", length = 100, nullable = false)
    private String cidade;

    @Column(name = "estado", length = 50, nullable = false)
    private String estado;

    @Column(name = "preco", nullable = false)
    private float preco;

    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricaoPousada;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario; // dono/admin

    @JsonIgnoreProperties("pousada")
    @OneToMany(mappedBy = "pousada", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Quartos> quartos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDescricaoPousada() {
        return descricaoPousada;
    }

    public void setDescricaoPousada(String descricaoPousada) {
        this.descricaoPousada = descricaoPousada;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public List<Quartos> getQuartos() {
        return quartos;
    }

    public void setQuartos(List<Quartos> quartos) {
        this.quartos = quartos;
    }

    
}
