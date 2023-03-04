package com.ifes.backend.persistence;

import com.ifes.backend.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IClienteRepository extends JpaRepository<Cliente, Integer> {
}
