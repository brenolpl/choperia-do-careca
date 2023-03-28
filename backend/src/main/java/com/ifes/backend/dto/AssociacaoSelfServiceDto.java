package com.ifes.backend.dto;

import java.math.BigDecimal;

public class AssociacaoSelfServiceDto {
    private Integer idAssociacao;
    private BigDecimal totalPagar;

    public Integer getIdAssociacao() {
        return idAssociacao;
    }

    public void setIdAssociacao(Integer idAssociacao) {
        this.idAssociacao = idAssociacao;
    }

    public BigDecimal getTotalPagar() {
        return totalPagar;
    }

    public void setTotalPagar(BigDecimal totalPagar) {
        this.totalPagar = totalPagar;
    }
}
