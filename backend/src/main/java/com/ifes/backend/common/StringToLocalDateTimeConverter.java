package com.ifes.backend.common;

import org.springframework.core.convert.converter.Converter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class StringToLocalDateTimeConverter implements Converter<String, LocalDateTime> {
    private static final String FORMATO_DATA = "dd/MM/yyyy, HH:mm:ss";

    @Override
    public LocalDateTime convert(String dataString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(FORMATO_DATA);
        return LocalDateTime.parse(dataString, formatter);
    }
}
