package com.ifes.backend.domain;

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

@Table(name = "itens_consumidos")
@Entity
public class ItensConsumidos implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "associacao_cliente_cartao_rfid_id", nullable = false)
    private AssociacaoClienteCartaoRFID associacaoClienteCartaoRFID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chope_id")
    private Chope chope;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

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

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
