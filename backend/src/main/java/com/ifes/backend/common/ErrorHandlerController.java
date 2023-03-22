package com.ifes.backend.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.PrintWriter;
import java.io.StringWriter;

@ControllerAdvice
public class ErrorHandlerController {
    @ExceptionHandler({Exception.class, RuntimeException.class, Throwable.class})
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 500

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        e.printStackTrace(printWriter);
        e.printStackTrace();
        String stackTrace = stringWriter.toString();

        return new ResponseEntity<>(
                new ErrorResponse(
                        status,
                        e.getMessage(),
                        stackTrace // specifying the stack trace in case of 500s
                ),
                status
        );
    }
}
