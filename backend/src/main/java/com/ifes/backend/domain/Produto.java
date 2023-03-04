package com.ifes.backend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Entity
public class Produto implements Serializable {

    @Id
    private String codigoBarras;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private Double quantidade;

    @Column(length = 1000)
    private String descricao;

    @Column(nullable = false)
    private BigDecimal precoCompra;

    @Column(nullable = false)
    private BigDecimal precoVenda;

    @Column
    private String unidade;

    @Column
    private String pontoEncomenda;

    @ManyToMany(mappedBy = "produtosConsumidos")
    private Set<AssociacaoClienteCartaoRFID> associacoes;

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

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPrecoCompra() {
        return precoCompra;
    }

    public void setPrecoCompra(BigDecimal precoCompra) {
        this.precoCompra = precoCompra;
    }

    public BigDecimal getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(BigDecimal precoVenda) {
        this.precoVenda = precoVenda;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getPontoEncomenda() {
        return pontoEncomenda;
    }

    public void setPontoEncomenda(String pontoEncomenda) {
        this.pontoEncomenda = pontoEncomenda;
    }

    public Set<AssociacaoClienteCartaoRFID> getAssociacoes() {
        return associacoes;
    }

    public void setAssociacoes(Set<AssociacaoClienteCartaoRFID> associacoes) {
        this.associacoes = associacoes;
    }
}
