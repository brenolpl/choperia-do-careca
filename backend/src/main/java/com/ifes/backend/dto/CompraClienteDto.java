package com.ifes.backend.dto;

import com.ifes.backend.domain.Cliente;

import java.math.BigDecimal;

public class CompraClienteDto{
    Cliente cliente;

    BigDecimal totalContaCliente;

    public CompraClienteDto() {
    }

    public CompraClienteDto(Cliente cliente, BigDecimal totalContaCliente) {
        this.cliente = cliente;
        this.totalContaCliente = totalContaCliente;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public BigDecimal getTotalContaCliente() {
        return totalContaCliente;
    }

    public void setTotalContaCliente(BigDecimal totalContaCliente) {
        this.totalContaCliente = totalContaCliente;
    }

    public static CompraClienteDto convert(Object[] row) {
        Cliente cliente = (Cliente) row[0];
        BigDecimal totalContaCliente = (BigDecimal) row[1];
        return new CompraClienteDto(cliente, totalContaCliente);
    }
}
