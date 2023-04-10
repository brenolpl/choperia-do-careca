package com.ifes.backend.dto;


public class Anexo {
    private String nomeDoc;
    private byte[] data;

    public String getNomeDoc() {
        return nomeDoc;
    }

    public void setNomeDoc(String nomeDoc) {
        this.nomeDoc = nomeDoc;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
