package com.ifes.backend.persistence;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Cliente;
import com.ifes.backend.dto.ReceitaDespesaDto;
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

    @Query("SELECT c, SUM(i.preco) " +
            "FROM AssociacaoClienteCartaoRFID a " +
            "JOIN a.itensConsumidos i " +
            "JOIN a.cliente c " +
            "WHERE a.dataSaida BETWEEN :dataInicio AND :dataFim " +
            "GROUP BY c.id")
    List<Object[]> findByDataSaidaBetweenOrderByValorTotalDesc(LocalDateTime dataInicio, LocalDateTime dataFim);

    Optional<AssociacaoClienteCartaoRFID> findById(Integer id);

//    @Query("SELECT DATE_TRUNC('day', lcc.dataEntrada) AS data, "
//            + "COALESCE(SUM(CASE WHEN ic.preco IS NOT NULL THEN ic.preco ELSE 0 END), 0) AS totalEntrada, "
//            + "COALESCE(SUM(CASE WHEN lcc.chope IS NOT NULL THEN lcc.precoTotal ELSE ep.precoCompra END), 0) AS totalSaida "
//            + "FROM LogCompraChope lcc "
//            + "LEFT JOIN lcc.chope c "
//            + "LEFT JOIN lcc.estoqueProduto ep "
//            + "LEFT JOIN ep.produto p "
//            + "LEFT JOIN lcc.associacaoClienteCartaoRFID accrf "
//            + "LEFT JOIN accrf.itensConsumidos ic "
//            + "WHERE (lcc.dataEntrada BETWEEN :dataDe AND :dataAte "
//            + "OR ep.dataEntrada BETWEEN :dataDe AND :dataAte "
//            + "OR accrf.dataSaida BETWEEN :dataDe AND :dataAte) "
//            + "GROUP BY DATE_TRUNC('day', lcc.dataEntrada) "
//            + "ORDER BY DATE_TRUNC('day', lcc.dataEntrada)")
//    List<ReceitaDespesaDto> getReceitasDespesas(LocalDateTime dataDe, LocalDateTime dataAte);
}
