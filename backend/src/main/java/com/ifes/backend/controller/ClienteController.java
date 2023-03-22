package com.ifes.backend.controller;

import com.ifes.backend.domain.Cliente;
import com.ifes.backend.persistence.IClienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/clientes")
public class ClienteController extends BaseController<Cliente, IClienteRepository, Integer> {

    public ClienteController(IClienteRepository repository) {
        super(Cliente.class, repository);
    }

    @GetMapping("{codigoRFID}/totalConta")
    public Double getTotalContaCliente(@PathVariable String codigoRFID){
        if(codigoRFID.equals("33")) throw new RuntimeException("Cliente não encontrado!");
        return 15.5;
    }

    @GetMapping("porCpf/{cpf}")
    private Cliente getByCpf(@PathVariable String cpf) {
        Optional<Cliente> cliente = this.repository.findByCpf(cpf);
        if(cliente.isPresent()) return cliente.get();
        else throw new RuntimeException("Este cliente não está cadastrado!");
    }
}
