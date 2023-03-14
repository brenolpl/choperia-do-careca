package com.ifes.backend.common;

public enum TipoUsuarioEnum {
    Administrador(99, "Administrador"),
    Cozinheiro(100, "Cozinheiro"),
    Fiscal_Entrada(101, "Fiscal de Entrada"),
    Caixa(102, "Caixa"),
    Fiscal_SelfService(103, "Fiscal de Self-Service"),
    Fiscal_Estoque(104, "Fiscal de Estoque");

    private Integer id;
    private String nome;

    TipoUsuarioEnum(Integer id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
