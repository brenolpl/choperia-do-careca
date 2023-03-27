package com.ifes.backend.controller;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Cliente;
import com.ifes.backend.domain.ItemConsumido;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import com.ifes.backend.persistence.IClienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
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
        Optional<AssociacaoClienteCartaoRFID> associacao = associacaoClienteCartaoRFIDRepository.findFirstByCartaoRFIDCodigoAndDataSaidaEquals(codigoRFID, null);
        if(!associacao.isPresent()) throw new RuntimeException("Cartao nao encontrado");
        else {
            BigDecimal total = BigDecimal.ZERO;
            for (ItemConsumido item : associacao.get().getItensConsumidos()) {
                if(item.getPreco() == null) {
                    total = total.add(item.getChope().getPrecoVenda());
                } else {
                    total = total.add(item.getPreco());
                }
            }
            return total.doubleValue();
        }
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
