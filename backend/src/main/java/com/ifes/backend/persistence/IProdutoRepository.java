package com.ifes.backend.persistence;

import com.ifes.backend.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IProdutoRepository extends JpaRepository<Produto, Integer> {
    List<Produto> findProdutosByIdIn(List<Integer> idList);

    Optional<Produto> findProdutoByCodigoBarras(String codigoBarras);
}
