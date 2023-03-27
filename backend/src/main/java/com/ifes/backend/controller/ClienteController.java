package com.ifes.backend.controller;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.Cliente;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import com.ifes.backend.persistence.IClienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/clientes")
public class ClienteController extends BaseController<Cliente, IClienteRepository, Integer> {

    private IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository;
    public ClienteController(IClienteRepository repository, IAssociacaoClienteCartaoRFIDRepository associacaoClienteCartaoRFIDRepository) {
        super(Cliente.class, repository);
        this.associacaoClienteCartaoRFIDRepository = associacaoClienteCartaoRFIDRepository;
    }

    @GetMapping("{codigoRFID}/totalConta")
    public Double getTotalContaCliente(@PathVariable String codigoRFID){
        if(codigoRFID.equals("33")) throw new RuntimeException("Cliente não encontrado!");
        return 15.5;
    }

    @GetMapping("porCpf/{cpf}")
    private Cliente getByCpf(@PathVariable String cpf) {
        Optional<Cliente> cliente = this.repository.findByCpf(cpf);
        if(cliente.isPresent()) {
            Optional<AssociacaoClienteCartaoRFID> associacao = associacaoClienteCartaoRFIDRepository.findFirstByClienteAndDataSaidaEquals(cliente.get(), null);
            if(associacao.isPresent()) throw new RuntimeException("Este cliente já possui um cartão associado em aberto, cartao: " + associacao.get().getCartaoRFID().getCodigo());
            else return cliente.get();
        }
        else throw new RuntimeException("Este cliente não está cadastrado!");
    }
}
