package com.ifes.backend.persistence;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IAssociacaoClienteCartaoRFIDRepository extends JpaRepository<AssociacaoClienteCartaoRFID, Integer> {
    List<AssociacaoClienteCartaoRFID> findAssociacaoClienteCartaoRFIDSByDataSaidaEquals(LocalDateTime dataSaida);

    AssociacaoClienteCartaoRFID findFirstByCartaoRFIDAndDataSaidaEquals(CartaoRFID cartaoRFID, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByClienteAndDataSaidaEquals(Cliente cliente, LocalDateTime dataSaida);

    Optional<AssociacaoClienteCartaoRFID> findFirstByCartaoRFIDCodigoAndDataSaidaEquals(String codigo, LocalDateTime dataSaida);
}
