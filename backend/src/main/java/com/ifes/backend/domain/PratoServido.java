package com.ifes.backend.domain;

import com.ifes.backend.common.StatusPratoEnum;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PratoServido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column
    private String nome;

    @Column
    private StatusPratoEnum statusPrato;

    public PratoServido() {
        this.statusPrato = StatusPratoEnum.PRONTO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusPratoEnum getStatusPrato() {
        return statusPrato;
    }

    public void setStatusPrato(StatusPratoEnum statusPrato) {
        this.statusPrato = statusPrato;
    }
}
