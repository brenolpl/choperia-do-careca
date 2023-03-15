package com.ifes.backend.controller;

import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.persistence.ICartaoRFIDRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/cartao-rfid")
public class CartaoRFIDController extends BaseController<CartaoRFID, ICartaoRFIDRepository, String> {

    public CartaoRFIDController(ICartaoRFIDRepository repository) {
        super(CartaoRFID.class, repository);
    }

    @PostMapping("salvarCartoes")
    public void salvarCartoes(@RequestBody Set<CartaoRFID> cartaoRFIDS) {
        this.repository.saveAll(cartaoRFIDS);
    }
}
