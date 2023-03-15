package com.ifes.backend.persistence;

import com.ifes.backend.domain.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITipoUsuarioRepository extends JpaRepository<TipoUsuario, Integer> {
}
