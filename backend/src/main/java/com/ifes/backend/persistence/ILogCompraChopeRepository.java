package com.ifes.backend.persistence;

import com.ifes.backend.domain.LogCompraChope;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ILogCompraChopeRepository extends JpaRepository<LogCompraChope, Integer> {
    public List<LogCompraChope> findLogCompraChopeByDataEntradaBetween(LocalDateTime dataInicial, LocalDateTime dataFinal);
}
