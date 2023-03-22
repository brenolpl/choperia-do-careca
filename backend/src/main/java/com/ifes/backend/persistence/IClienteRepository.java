package com.ifes.backend.persistence;

import com.ifes.backend.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface IClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByCpf(String cpf);
}
