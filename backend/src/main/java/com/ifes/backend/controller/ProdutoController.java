package com.ifes.backend.controller;

import com.ifes.backend.application.GerarCodigoBarras;
import com.ifes.backend.application.GerarImagemCodigoBarrasProdutoExistente;
import com.ifes.backend.domain.Produto;
import com.ifes.backend.domain.ProdutoCodigoDto;
import com.ifes.backend.persistence.IProdutoRepository;
import com.ifes.backend.services.ProdutoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private ProdutoService produtoService;

    public ProdutoController(IProdutoRepository repository, EntityManager entityManager, ProdutoService produtoService) {
        super(Produto.class, repository);
        this.entityManager = entityManager;
        this.produtoService = produtoService;
    }

    @Override
    @PostMapping()
    public Produto create(@RequestBody Produto produto) {
        return this.produtoService.cadastrarProduto(produto);
    }

    @PostMapping("gerarCodigoBarras")
    public void gerarCodigoBarras(@RequestBody Set<Produto> produtos) {
        new GerarCodigoBarras(new ArrayList<>(produtos), repository, entityManager).execute();
    }

    @PostMapping("gerarICBProdutoExistente/{id}")
    public void gerarImagemCodigoBarrasProdutoExistente(@PathVariable Integer id) {
        new GerarImagemCodigoBarrasProdutoExistente(id, repository).execute();
    }

    @GetMapping("codigos")
    public List<ProdutoCodigoDto> getProdutosComCodigoBarras(){
        return this.produtoService.getProdutosECodigos();
    }
}
