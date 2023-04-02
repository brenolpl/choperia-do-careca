package com.ifes.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;

@Table(name = "itens_consumidos")
@Entity
public class ItemConsumido implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "associacao_cliente_cartao_rfid_id", nullable = false)
    private AssociacaoClienteCartaoRFID associacaoClienteCartaoRFID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chope_id")
    private Chope chope;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco")
    private BigDecimal preco;

    public ItemConsumido(Chope chope, Integer id, String nome, BigDecimal preco) {
        this.id = id;
        this.chope = chope;
        this.nome = nome;
        this.preco = preco;
    }

    public ItemConsumido() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AssociacaoClienteCartaoRFID getAssociacaoClienteCartaoRFID() {
        return associacaoClienteCartaoRFID;
    }

    public void setAssociacaoClienteCartaoRFID(AssociacaoClienteCartaoRFID associacaoClienteCartaoRFID) {
        this.associacaoClienteCartaoRFID = associacaoClienteCartaoRFID;
    }

    public Chope getChope() {
        return chope;
    }

    public void setChope(Chope chope) {
        this.chope = chope;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
}
