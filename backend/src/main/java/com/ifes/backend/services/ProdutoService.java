package com.ifes.backend.services;


import com.ifes.backend.application.GerarCodigoBarras;
import com.ifes.backend.domain.Produto;
import com.ifes.backend.dto.ProdutoCodigoDto;
import com.ifes.backend.persistence.IProdutoRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
public class ProdutoService {

    private IProdutoRepository produtoRepository;


    public ProdutoService(IProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto cadastrarProduto(Produto produto) {
        produto.setQuantidadeEstoque(0);
        produto = new GerarCodigoBarras(produto, produtoRepository).execute();
        return produtoRepository.save(produto);
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

    public Produto atualizarProduto(Produto produto) {
        produto = new GerarCodigoBarras(produto, produtoRepository).execute();
        return produtoRepository.save(produto);
    }

    public Produto getProdutoByCodigoBarras(String codigo) {
        Optional<Produto> produtoOptional = produtoRepository.findProdutoByCodigoBarras(codigo);
        if(produtoOptional.isPresent()){
            return produtoOptional.get();
        } else {
            throw new RuntimeException("Não existe um produto com esse código de barras");
        }
    }

    public void adicionarEstoque(List<Produto> produtos) {
        for(Produto produtoSalvar : produtos){
            Optional<Produto> produtoOptional = produtoRepository.findById(produtoSalvar.getId());
            if(produtoOptional.isPresent()){
                Produto produto = produtoOptional.get();
                Integer totalEstoque = produto.getQuantidadeEstoque() + produtoSalvar.getQuantidadeEstoque();
                produto.setQuantidadeEstoque(totalEstoque);
                produtoRepository.save(produto);
            }
        }
    }
}
