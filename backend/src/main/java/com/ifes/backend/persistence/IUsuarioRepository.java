package com.ifes.backend.persistence;

import com.ifes.backend.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {

    Usuario findByLoginAndBiometria(String login, String biometria);
}
