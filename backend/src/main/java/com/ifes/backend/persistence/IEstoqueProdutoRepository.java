package com.ifes.backend.persistence;

import com.ifes.backend.domain.EstoqueProduto;
import com.ifes.backend.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IEstoqueProdutoRepository extends JpaRepository<EstoqueProduto, Integer> {
    List<EstoqueProduto> findByProdutoAndDataSaidaEquals(Produto produto, LocalDateTime dataSaida);
}
