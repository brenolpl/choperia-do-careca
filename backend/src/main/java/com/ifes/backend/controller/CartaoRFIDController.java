package com.ifes.backend.controller;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import com.ifes.backend.persistence.ICartaoRFIDRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/cartao-rfid")
public class CartaoRFIDController extends BaseController<CartaoRFID, ICartaoRFIDRepository, String> {

    private IAssociacaoClienteCartaoRFIDRepository associacaoRepository;

    public CartaoRFIDController(ICartaoRFIDRepository repository, IAssociacaoClienteCartaoRFIDRepository associacaoRepository) {
        super(CartaoRFID.class, repository);
        this.associacaoRepository = associacaoRepository;
    }

    @PostMapping("salvarCartoes")
    public void salvarCartoes(@RequestBody Set<CartaoRFID> cartaoRFIDS) {
        this.repository.saveAll(cartaoRFIDS);
    }

    @Override
    public CartaoRFID get(@PathVariable String id) {
        Optional<CartaoRFID> cartaoRFID = repository.findById(id);
        if(cartaoRFID.isPresent()) {
            return cartaoRFID.get();
        } else {
            throw new RuntimeException("Cartão não cadastrado no sistema!");
        }
    }

    @GetMapping("esta-associado/{id}")
    public CartaoRFID getCartaoNaoAssociado(@PathVariable String id) {
        Optional<CartaoRFID> cartaoRFID = repository.findById(id);
        if(cartaoRFID.isPresent()) {
            AssociacaoClienteCartaoRFID associacao = associacaoRepository.findFirstByCartaoRFIDAndDataSaidaEquals(cartaoRFID.get(), null);
            if(associacao != null) throw new RuntimeException("Cartão já associado a outro cliente (" + associacao.getCliente().getNome() + ")");
        }
        return cartaoRFID.get();
    }
}
