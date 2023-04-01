package com.ifes.backend.controller;

import com.ifes.backend.domain.TipoUsuario;
import com.ifes.backend.domain.Usuario;
import com.ifes.backend.persistence.ITipoUsuarioRepository;
import com.ifes.backend.persistence.IUsuarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController extends BaseController<Usuario, IUsuarioRepository, Integer>{

    ITipoUsuarioRepository tipoUsuarioRepository;

    public UsuarioController(IUsuarioRepository repo, ITipoUsuarioRepository tipoUsuarioRepository) {
        super(Usuario.class, repo);
        this.tipoUsuarioRepository = tipoUsuarioRepository;
    }

    @PostMapping("login")
    public Usuario login(@RequestBody Usuario usuario) {
        Usuario user = repository.findByLoginAndBiometria(usuario.getLogin(), usuario.getBiometria());
        if(user != null) {
            return user;
        }

        throw new RuntimeException("Usuario ou senha inválidos!");
    }

    @GetMapping("tipos")
    public List<TipoUsuario> getTiposUsuarios(){
        return tipoUsuarioRepository.findAll();
    }
}
