package com.ifes.backend.persistence;

import com.ifes.backend.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProdutoRepository extends JpaRepository<Produto, Integer> {
}
