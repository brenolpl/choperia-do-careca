package com.ifes.backend.controller;

import com.ifes.backend.application.EnviarEmail;
import com.ifes.backend.dto.Email;
import com.ifes.backend.services.GmailService;
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
    private GmailService gmailService;

    public MailController(GmailService gmailService, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        this.gmailService = gmailService;
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    @PostMapping("send")
    public void send(@RequestBody Email email) throws MessagingException, GeneralSecurityException, IOException {
        new EnviarEmail(email, gmailService, associacaoClienteCartaoRFIDRepository).execute();
    }
}
