package com.ifes.backend.controller;

import com.ifes.backend.domain.Produto;
import com.ifes.backend.dto.ProdutoCodigoDto;
import com.ifes.backend.persistence.IProdutoRepository;
import com.ifes.backend.services.ProdutoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.List;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController extends BaseController<Produto, IProdutoRepository, Integer>{

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

    @Override
    @PatchMapping("{id}")
    public Produto update(@RequestBody Produto produto) {
        return this.produtoService.atualizarProduto(produto);
    }

    @GetMapping("codigos")
    public List<ProdutoCodigoDto> getProdutosComCodigoBarras(){
        return this.produtoService.getProdutosECodigos();
    }

    @GetMapping("codigo-barras/{codigo}")
    public Produto getProdutoByCodigoBarras(@PathVariable String codigo){
        return this.produtoService.getProdutoByCodigoBarras(codigo);
    }

    @PostMapping("adicionar-estoque")
    public void adicionarEstoque(@RequestBody List<Produto> produtos){
        this.produtoService.adicionarEstoque(produtos);
    }
}
