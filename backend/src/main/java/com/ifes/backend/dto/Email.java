package com.ifes.backend.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Email implements Serializable {
    private String assunto;
    private String mensagem;
    private LocalDateTime dataDe;
    private LocalDateTime dataAte;

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public LocalDateTime getDataDe() {
        return dataDe;
    }

    public void setDataDe(LocalDateTime dataDe) {
        this.dataDe = dataDe;
    }

    public LocalDateTime getDataAte() {
        return dataAte;
    }

    public void setDataAte(LocalDateTime dataAte) {
        this.dataAte = dataAte;
    }
}
