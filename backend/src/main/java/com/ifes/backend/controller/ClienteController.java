package com.ifes.backend.controller;

import com.ifes.backend.domain.Cliente;
import com.ifes.backend.persistence.IClienteRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/clientes")
public class ClienteController extends BaseController<Cliente, IClienteRepository, Integer> {

    public ClienteController(IClienteRepository repository) {
        super(Cliente.class, repository);
    }
}
