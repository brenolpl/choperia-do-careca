package com.ifes.backend.controller;

import com.ifes.backend.domain.Produto;
import com.ifes.backend.persistence.IProdutoRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController extends BaseController<Produto, IProdutoRepository>{

    public ProdutoController(IProdutoRepository repository) {
        super(Produto.class, repository);
    }
}
