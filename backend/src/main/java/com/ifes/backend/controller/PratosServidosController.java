package com.ifes.backend.controller;

import com.ifes.backend.domain.PratoServido;
import com.ifes.backend.persistence.IPratoServidoRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pratos")
public class PratosServidosController extends BaseController<PratoServido, IPratoServidoRepository, Integer>{
    public PratosServidosController(IPratoServidoRepository repository) {
        super(PratoServido.class, repository);
    }
}
