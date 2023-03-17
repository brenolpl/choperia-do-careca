package com.ifes.backend.persistence;

import com.ifes.backend.domain.PratoServido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPratoServidoRepository extends JpaRepository<PratoServido, Integer> {
}
