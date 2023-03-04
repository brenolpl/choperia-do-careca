package com.ifes.backend.controller;

import com.ifes.backend.domain.Usuario;
import com.ifes.backend.persistence.IUsuarioRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController extends BaseController<Usuario, IUsuarioRepository>{

    public UsuarioController(IUsuarioRepository repo) {
        super(Usuario.class, repo);
    }

    @PostMapping("login")
    public boolean login(@RequestBody Usuario usuario) {
        Usuario user = repository.findByLoginAndBiometria(usuario.getLogin(), usuario.getBiometria());
        if(user != null) {
            return true;
        }

        return false;
    }
}
