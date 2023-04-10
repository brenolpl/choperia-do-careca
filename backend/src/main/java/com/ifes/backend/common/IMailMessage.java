package com.ifes.backend.common;

import com.ifes.backend.dto.Anexo;

import java.util.List;

@FunctionalInterface
public interface IMailMessage {

    void sendMessage(String subject, String body, String[] to, String[] cc, String[] cco, List<Anexo> anexos);
}
