package com.ifes.backend.controller;

import com.ifes.backend.application.EnviarEmail;
import com.ifes.backend.common.IMailMessage;
import com.ifes.backend.dto.Email;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mails")
public class MailController {

    private IMailMessage mailMessage;
    private IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository;

    public MailController(IMailMessage mailMessage, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        this.mailMessage = mailMessage;
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    @PostMapping("send")
    public void send(@RequestBody Email email) {
        new EnviarEmail(email, mailMessage, associacaoClienteCartaoRFIDRepository).execute();
    }
}
