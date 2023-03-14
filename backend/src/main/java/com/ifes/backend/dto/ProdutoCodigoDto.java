package com.ifes.backend.dto;

import lombok.Data;

public class ProdutoCodigoDto {
    private Integer id;
    private String nome;
    private String codigoBarras;
    private String codigoBarrasImg;

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

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getCodigoBarrasImg() {
        return codigoBarrasImg;
    }

    public void setCodigoBarrasImg(String codigoBarrasImg) {
        this.codigoBarrasImg = codigoBarrasImg;
    }
}
