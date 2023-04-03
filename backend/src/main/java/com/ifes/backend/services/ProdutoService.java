package com.ifes.backend.services;


import com.ifes.backend.application.GerarCodigoBarras;
import com.ifes.backend.domain.EstoqueProduto;
import com.ifes.backend.domain.EstoqueProduto_;
import com.ifes.backend.domain.Produto;
import com.ifes.backend.dto.ProdutoCodigoDto;
import com.ifes.backend.dto.ProdutoInserirDto;
import com.ifes.backend.dto.ProdutoRemoverDto;
import com.ifes.backend.persistence.IEstoqueProdutoRepository;
import com.ifes.backend.persistence.IProdutoRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@Service
public class ProdutoService {

    private IProdutoRepository produtoRepository;

    private IEstoqueProdutoRepository estoqueProdutoRepository;
    private EntityManager entityManager;

    public ProdutoService(IProdutoRepository produtoRepository, IEstoqueProdutoRepository estoqueProdutoRepository, EntityManager entityManager) {
        this.produtoRepository = produtoRepository;
        this.estoqueProdutoRepository = estoqueProdutoRepository;
        this.entityManager = entityManager;
    }

    public Produto cadastrarProduto(Produto produto) {
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

    public void adicionarEstoque(List<ProdutoInserirDto> produtos) {
        for(ProdutoInserirDto produtoSalvar : produtos){
            Optional<Produto> produtoOptional = produtoRepository.findById(produtoSalvar.getId());
            if(produtoOptional.isPresent()){

                Produto produto = produtoOptional.get();

                for(int i = 0; i < produtoSalvar.getQuantidadeInserir(); i++){
                    EstoqueProduto estoqueProduto = new EstoqueProduto();
                    estoqueProduto.setProduto(produto);
                    estoqueProduto.setPrecoCompra(produto.getPrecoCompra());
                    estoqueProdutoRepository.save(estoqueProduto);
                }
            }
        }
    }

    public void removerEstoque(List<ProdutoRemoverDto> produtos) {
        for(ProdutoRemoverDto produtoRemover : produtos){
            Optional<Produto> produtoOptional = produtoRepository.findById(produtoRemover.getId());
            if(produtoOptional.isPresent()){
                Produto produto = produtoOptional.get();

                for(int i = 0; i < produtoRemover.getQuantidadeRemover(); i++){
                    List<EstoqueProduto> estoqueProdutos = estoqueProdutoRepository.findByProdutoAndDataSaidaEquals(produto, null);

                    if(!estoqueProdutos.isEmpty()){
                        EstoqueProduto estoqueProduto = estoqueProdutos.get(0);
                        estoqueProduto.setDataSaida(LocalDateTime.now());
                        estoqueProdutoRepository.save(estoqueProduto);
                    }
                }
            }
        }
    }

    public List<Produto> getProdutosPeriodo(LocalDateTime dataInicial, LocalDateTime dataFinal) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<EstoqueProduto> cq = cb.createQuery(EstoqueProduto.class);
        Root<EstoqueProduto> root = cq.from(EstoqueProduto.class);

        cq.select(root)
                .where(cb.between(root.get(EstoqueProduto_.dataEntrada), dataInicial, dataFinal));

        TypedQuery<EstoqueProduto> query = entityManager.createQuery(cq);

        List<EstoqueProduto> estoqueProdutos = query.getResultList();

        List<Produto> produtos = new ArrayList<>();

        for(EstoqueProduto estoqueProduto : estoqueProdutos){
            Optional<Produto> produtoOptional = produtos.stream().filter(p -> p.getId().equals(estoqueProduto.getProduto().getId())).findAny();
            Produto produto = new Produto();
            if(produtoOptional.isEmpty()){
                produto.setId(estoqueProduto.getProduto().getId());
                produto.setNome(estoqueProduto.getProduto().getNome());
                produto.setEstoqueProdutos(new HashSet<>());
                produtos.add(produto);
            } else {
                produto = produtoOptional.get();
            }
            produto.getEstoqueProdutos().add(estoqueProduto);
        }

        return produtos;
    }
}
