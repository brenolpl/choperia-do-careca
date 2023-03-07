package com.ifes.backend.persistence;

import com.ifes.backend.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProdutoRepository extends JpaRepository<Produto, Integer> {
    List<Produto> findProdutosByIdIn(List<Integer> idList);
}
