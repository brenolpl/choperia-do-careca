package com.ifes.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ReceitaDespesaDto {
    private BigDecimal totalEntrada;

    private BigDecimal totalSaida;

    private LocalDateTime data;

    public ReceitaDespesaDto() {
    }

    public ReceitaDespesaDto(LocalDateTime data, BigDecimal totalEntrada, BigDecimal totalSaida) {
        this.totalEntrada = totalEntrada;
        this.totalSaida = totalSaida;
        this.data = data;
    }

    public ReceitaDespesaDto(String data, BigDecimal totalEntrada, BigDecimal totalSaida) {
//        DateTimeFormatter DATEFORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
//        LocalDate ld = LocalDate.parse(data, DATEFORMATTER);
//        LocalDateTime ldt = LocalDateTime.of(ld, LocalDateTime.now().toLocalTime());

        System.out.println("aqui");
        this.totalEntrada = totalEntrada;
        this.totalSaida = totalSaida;
//        this.data = ldt;
    }

    public BigDecimal getTotalEntrada() {
        return totalEntrada;
    }

    public void setTotalEntrada(BigDecimal totalEntrada) {
        this.totalEntrada = totalEntrada;
    }

    public BigDecimal getTotalSaida() {
        return totalSaida;
    }

    public void setTotalSaida(BigDecimal totalSaida) {
        this.totalSaida = totalSaida;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}
