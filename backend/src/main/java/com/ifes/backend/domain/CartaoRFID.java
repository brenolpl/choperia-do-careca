package com.ifes.backend.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Entity
public class CartaoRFID implements Serializable {

    @Id
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
