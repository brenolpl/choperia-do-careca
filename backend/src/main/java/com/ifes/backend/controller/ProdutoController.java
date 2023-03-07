package com.ifes.backend.controller;

import com.ifes.backend.application.GerarCodigoBarras;
import com.ifes.backend.domain.Produto;
import com.ifes.backend.persistence.IProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController extends BaseController<Produto, IProdutoRepository>{

    private EntityManager entityManager;

    public ProdutoController(IProdutoRepository repository, EntityManager entityManager) {
        super(Produto.class, repository);
        this.entityManager = entityManager;
    }

    @PostMapping("gerarCodigoBarras")
    public void gerarCodigoBarras(@RequestBody Set<Produto> produtos) {
        new GerarCodigoBarras(new ArrayList<>(produtos), repository, entityManager).execute();
    }
}
