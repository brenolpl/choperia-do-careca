package com.ifes.backend.persistence;

import com.ifes.backend.domain.Chope;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IChopeRepository extends JpaRepository<Chope, Integer> {
    Optional<Chope> findChopeByCartaoRFID(String cartaoRFID);
}
