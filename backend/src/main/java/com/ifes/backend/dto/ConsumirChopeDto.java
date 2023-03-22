package com.ifes.backend.dto;

import com.ifes.backend.domain.CartaoRFID;


import java.util.List;


public class ConsumirChopeDto {
    private String codigoRFID;
    private List<ChopeDto> chopes;


    public String getCodigoRFID() {
        return codigoRFID;
    }

    public void setCodigoRFID(String codigoRFID) {
        this.codigoRFID = codigoRFID;
    }

    public List<ChopeDto> getChopes() {
        return chopes;
    }

    public void setChopes(List<ChopeDto> chopes) {
        this.chopes = chopes;
    }
}
