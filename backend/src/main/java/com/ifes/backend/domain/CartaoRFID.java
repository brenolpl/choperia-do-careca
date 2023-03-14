package com.ifes.backend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Table(name = "cartao_rfid")
@Entity
public class CartaoRFID implements Serializable {

    @Id
    @Column(name = "codigo")
    private String codigo;

    @OneToMany(mappedBy = "cartaoRFID")
    private List<AssociacaoClienteCartaoRFID> associacoes;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public List<AssociacaoClienteCartaoRFID> getAssociacoes() {
        return associacoes;
    }

    public void setAssociacoes(List<AssociacaoClienteCartaoRFID> associacoes) {
        this.associacoes = associacoes;
    }
}
