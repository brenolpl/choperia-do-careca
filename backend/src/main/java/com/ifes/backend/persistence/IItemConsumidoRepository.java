package com.ifes.backend.persistence;

import com.ifes.backend.domain.ItemConsumido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IItemConsumidoRepository extends JpaRepository<ItemConsumido, Integer> {
}
