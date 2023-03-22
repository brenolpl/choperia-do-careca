package com.ifes.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @Column(name = "codigo", length = 10)
    private String codigo;

    public CartaoRFID(String codigo) {
        this.codigo = codigo;
    }

    public CartaoRFID() {}

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
