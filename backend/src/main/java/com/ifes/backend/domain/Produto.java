package com.ifes.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Table(name = "produto")
@Entity
public class Produto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "codigo_barras", nullable = false)
    private String codigoBarras;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco_compra", nullable = false)
    private BigDecimal precoCompra;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "produto")
    @JsonManagedReference
    private Set<EstoqueProduto> estoqueProdutos;

    public Produto() {}

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

    public BigDecimal getPrecoCompra() {
        return precoCompra;
    }

    public void setPrecoCompra(BigDecimal precoCompra) {
        this.precoCompra = precoCompra;
    }

    public Set<EstoqueProduto> getEstoqueProdutos() {
        return estoqueProdutos;
    }

    public void setEstoqueProdutos(Set<EstoqueProduto> estoqueProdutos) {
        this.estoqueProdutos = estoqueProdutos;
    }

    public Long getQuantidadeEstoque(){
        if(this.estoqueProdutos == null) return Long.valueOf(0);
        return this.estoqueProdutos.stream().filter(p -> p.getDataSaida() == null).count();
    }
}
