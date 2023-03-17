package com.ifes.backend.dto;

public class ProdutoRemoverDto {
    private Integer id;

    private String codigoBarras;

    private String nome;

    private Integer quantidadeEstoque;

    private Integer quantidadeRemover;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Integer getQuantidadeRemover() {
        return quantidadeRemover;
    }

    public void setQuantidadeRemover(Integer quantidadeRemover) {
        this.quantidadeRemover = quantidadeRemover;
    }
}
