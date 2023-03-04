package com.ifes.backend.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class AssociacaoClienteCartaoRFID implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY,  optional = false)
    private CartaoRFID cartaoRFID;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Cliente cliente;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataEntrada;

    @Column(updatable = false)
    private LocalDateTime dataSaida;

    @ManyToMany
    private Set<Produto> produtosConsumidos;


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

    public Set<Produto> getProdutosConsumidos() {
        return produtosConsumidos;
    }

    public void setProdutosConsumidos(Set<Produto> produtosConsumidos) {
        this.produtosConsumidos = produtosConsumidos;
    }
}
