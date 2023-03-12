package com.ifes.backend.domain;

public class ProdutoCodigoDto {

    Integer id;
    String nome;
    Integer codigoBarras;
    String codigoBarrasImg;

    public ProdutoCodigoDto() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCodigoBarras() {
        return codigoBarras;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCodigoBarras(Integer codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getCodigoBarrasImg() {
        return codigoBarrasImg;
    }

    public void setCodigoBarrasImg(String codigoBarrasImg) {
        this.codigoBarrasImg = codigoBarrasImg;
    }
}
