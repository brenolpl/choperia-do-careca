package com.ifes.backend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Set;

@Table(name = "tipo_usuario")
@Entity
public class TipoUsuario implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @OneToMany(mappedBy = "tipoUsuario", fetch = FetchType.LAZY)
    private Set<Usuario> usuariosAssociados;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Usuario> getUsuariosAssociados() {
        return usuariosAssociados;
    }

    public void setUsuariosAssociados(Set<Usuario> usuariosAssociados) {
        this.usuariosAssociados = usuariosAssociados;
    }
}
