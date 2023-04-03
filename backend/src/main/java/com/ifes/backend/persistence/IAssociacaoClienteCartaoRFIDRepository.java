package com.ifes.backend.persistence;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IAssociacaoClienteCartaoRFIDRepository extends JpaRepository<AssociacaoClienteCartaoRFID, Integer> {
    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaEquals(LocalDateTime dataSaida);

    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaNotNull();

    Optional<AssociacaoClienteCartaoRFID> findFirstByCartaoRFIDAndDataSaidaEquals(CartaoRFID cartaoRFID, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByClienteAndDataSaidaEquals(Cliente cliente, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByCartaoRFIDCodigoAndDataSaidaEquals(String codigo, LocalDateTime dataSaida);

    @Query("SELECT a FROM AssociacaoClienteCartaoRFID a JOIN a.itensConsumidos i WHERE a.dataSaida BETWEEN :dataInicio AND :dataFim GROUP BY a.id ORDER BY SUM(i.preco) DESC")
    List<AssociacaoClienteCartaoRFID> findByDataSaidaBetweenOrderByValorTotalDesc(LocalDateTime dataInicio, LocalDateTime dataFim);
}
