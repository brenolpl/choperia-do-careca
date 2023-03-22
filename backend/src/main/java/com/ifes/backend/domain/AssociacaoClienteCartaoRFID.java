package com.ifes.backend.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "associacao_cliente_cartao_rfid")
@Entity
public class AssociacaoClienteCartaoRFID implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @JoinColumn(name = "cartao_rfid_codigo", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER,  optional = false)
    private CartaoRFID cartaoRFID;

    @JoinColumn(name = "cliente_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Cliente cliente;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "data_entrada", nullable = false, updatable = false)
    private LocalDateTime dataEntrada;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "data_saida")
    private LocalDateTime dataSaida;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "associacaoClienteCartaoRFID")
    private Set<ItemConsumido> itensConsumidos;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CartaoRFID getCartaoRFID() {
        return cartaoRFID;
    }

    public void setCartaoRFID(CartaoRFID cartaoRFID) {
        this.cartaoRFID = cartaoRFID;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDateTime getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDateTime dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public LocalDateTime getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(LocalDateTime dataSaida) {
        this.dataSaida = dataSaida;
    }

    public Set<ItemConsumido> getItensConsumidos() {
        return itensConsumidos;
    }

    public void setItensConsumidos(Set<ItemConsumido> itensConsumidos) {
        this.itensConsumidos = itensConsumidos;
    }
}
