package com.ifes.backend.application;

import com.ifes.backend.common.IMailMessage;
import com.ifes.backend.dto.Email;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;

import java.util.Objects;

public class EnviarEmail {

    private Email email;
    private IMailMessage mailMessage;
    private IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository;

    public EnviarEmail(Email email, IMailMessage mailMessage, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        this.email = email;
        this.mailMessage = mailMessage;
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    public void execute() {
        String[] emails = (String[]) associacaoClienteCartaoRFIDRepository.findAssociacaoClienteCartaoRFIDSByDataSaidaBetween(email.getDataDe(), email.getDataAte())
                .stream()
                .map(a -> a.getCliente().getEmail())
                .filter(Objects::nonNull)
                .toArray();

        this.mailMessage.sendMessage(email.getAssunto(), email.getMensagem(), emails, null, null, null);
    }
}
