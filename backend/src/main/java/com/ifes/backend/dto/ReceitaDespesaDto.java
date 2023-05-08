package com.ifes.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ReceitaDespesaDto {
    private BigDecimal receita;

    private BigDecimal despesa;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate data;

    public ReceitaDespesaDto() {
    }

    public ReceitaDespesaDto(LocalDate data, BigDecimal receita, BigDecimal despesa) {
        this.receita = receita;
        this.despesa = despesa;
        this.data = data;
    }

    public BigDecimal getReceita() {
        return receita;
    }

    public void setReceita(BigDecimal receita) {
        this.receita = receita;
    }

    public BigDecimal getDespesa() {
        return despesa;
    }

    public void setDespesa(BigDecimal despesa) {
        this.despesa = despesa;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
