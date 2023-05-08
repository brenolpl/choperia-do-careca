package com.ifes.backend.persistence;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Cliente;
import com.ifes.backend.dto.ReceitaDespesaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IAssociacaoClienteCartaoRFIDRepository extends JpaRepository<AssociacaoClienteCartaoRFID, Integer> {
    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaEquals(LocalDateTime dataSaida);

    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaNotNull();

    Optional<AssociacaoClienteCartaoRFID> findFirstByCartaoRFIDAndDataSaidaEquals(CartaoRFID cartaoRFID, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByClienteAndDataSaidaEquals(Cliente cliente, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByCartaoRFIDCodigoAndDataSaidaEquals(String codigo, LocalDateTime dataSaida);

    @Query("SELECT c, SUM(i.preco) " +
            "FROM AssociacaoClienteCartaoRFID a " +
            "JOIN a.itensConsumidos i " +
            "JOIN a.cliente c " +
            "WHERE a.dataSaida BETWEEN :dataInicio AND :dataFim " +
            "GROUP BY c.id")
    List<Object[]> findByDataSaidaBetweenOrderByValorTotalDesc(LocalDateTime dataInicio, LocalDateTime dataFim);

    Optional<AssociacaoClienteCartaoRFID> findById(Integer id);

    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}


