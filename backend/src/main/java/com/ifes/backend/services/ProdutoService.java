package com.ifes.backend.services;


import com.ifes.backend.application.GerarCodigoBarras;
import com.ifes.backend.domain.Produto;
import com.ifes.backend.domain.ProdutoCodigoDto;
import com.ifes.backend.persistence.IProdutoRepository;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@Service
public class ProdutoService {

    private IProdutoRepository produtoRepository;
    private EntityManager entityManager;

    private ResourceLoader resourceLoader;


    public ProdutoService(IProdutoRepository produtoRepository, EntityManager entityManager, ResourceLoader resourceLoader) {
        this.produtoRepository = produtoRepository;
        this.entityManager = entityManager;
        this.resourceLoader = resourceLoader;
    }

    public Produto cadastrarProduto(Produto produto) {
        produto = produtoRepository.save(produto);
        if(produto.getCodigoBarras() == null){
            ArrayList<Produto> produtos = new ArrayList<>();
            produtos.add(produto);
            new GerarCodigoBarras(new ArrayList<>(produtos), produtoRepository, entityManager).execute();
        }

        return produto;
    }

    public List<ProdutoCodigoDto> getProdutosECodigos() {
        List<Produto> produtos = new ArrayList<>();
        List<ProdutoCodigoDto> produtoCodigos = new ArrayList<>();
        produtos = this.produtoRepository.findAll();

        produtos.forEach(produto -> {
            try {
                String imageString = getImageAsString(produto.getNome());

                ProdutoCodigoDto produtoCodigoDto = new ProdutoCodigoDto();
                produtoCodigoDto.setId(produto.getId());
                produtoCodigoDto.setNome(produto.getNome());
                produtoCodigoDto.setCodigoBarras(produto.getCodigoBarras());
                produtoCodigoDto.setCodigoBarrasImg(imageString);

                produtoCodigos.add(produtoCodigoDto);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return produtoCodigos;
    }

    private String getImageAsString(String filename) throws IOException {
        File outputFile = new File("assets/" + filename + ".png");
        Path imagePath = Paths.get(outputFile.getPath());

        byte[] bytes = Files.readAllBytes(imagePath);
        String base64 = Base64.getEncoder().encodeToString(bytes);
        return "data:image/png;base64," + base64;
    }

}
