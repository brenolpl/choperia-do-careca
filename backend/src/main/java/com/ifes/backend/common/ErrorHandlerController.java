package com.ifes.backend.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class ErrorHandlerController {

    public static final Logger LOGGER = LoggerFactory.getLogger(ErrorHandlerController.class);
    @ExceptionHandler({Exception.class, RuntimeException.class, Throwable.class})
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return new ResponseEntity<>(
                new ErrorResponse(
                        INTERNAL_SERVER_ERROR,
                        e.getMessage(),
                        e.getCause().toString()
                ),
                INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler({MessagingException.class})
    public ResponseEntity<ErrorResponse> handleExceptions(MessagingException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(
                new ErrorResponse(
                        INTERNAL_SERVER_ERROR,
                        "Falha ao criar o objeto de mensagem para enviar o e-mail!",
                        e.getCause().toString()
                ),
                INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler({GeneralSecurityException.class})
    public ResponseEntity<ErrorResponse> handleExceptions(GeneralSecurityException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(
                new ErrorResponse(
                        INTERNAL_SERVER_ERROR,
                        "Falha ao obter o protocolo de transporte de envio de e-mail do Google.",
                        e.getCause().toString()
                ),
                INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler({IOException.class})
    public ResponseEntity<ErrorResponse> handleExceptions(IOException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(
                new ErrorResponse(
                        INTERNAL_SERVER_ERROR,
                        "Falha ao ler arquivo do sistema.",
                        e.getCause().toString()
                ),
                INTERNAL_SERVER_ERROR
        );
    }
}
