package com.ifes.backend.application;

import com.ifes.backend.common.IMailMessage;
import com.ifes.backend.dto.Email;
import com.ifes.backend.google.Gmailer;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Objects;

public class EnviarEmail {

    private Email email;
    private Gmailer gmailer;
    private IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository;

    public EnviarEmail(Email email, Gmailer gmailer, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        this.email = email;
        this.gmailer = gmailer;
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    public void execute() throws MessagingException, GeneralSecurityException, IOException {
        Object[] emails = associacaoClienteCartaoRFIDRepository.findAssociacaoClienteCartaoRFIDSByDataSaidaBetween(email.getDataDe(), email.getDataAte())
                .stream()
                .map(a -> a.getCliente().getEmail())
                .filter(Objects::nonNull)
                .toArray();

        String[] emailString = new String[emails.length];

        for (int i = 0; i < emails.length; i++) {
            emailString[i] = (String) emails[i];
        }
        if(emailString.length > 0) this.gmailer.sendMail("Choperia do Careca: Novas promoções", email.getMensagem(), emailString);
        else throw new RuntimeException("Não foi possível enviar o e-mail");
    }
}
