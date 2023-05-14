package com.ifes.backend.controller;

import com.ifes.backend.application.EnviarEmail;
import com.ifes.backend.dto.Email;
import com.ifes.backend.google.Gmailer;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("api/enviarEmail")
@CrossOrigin
public class MailController {

    private IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository;
    private Gmailer gmailer;

    public MailController(Gmailer gmailer, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        this.gmailer = gmailer;
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    @PostMapping("send")
    public void send(@RequestBody Email email) throws MessagingException, GeneralSecurityException, IOException {
        new EnviarEmail(email, gmailer, associacaoClienteCartaoRFIDRepository).execute();
    }
}
