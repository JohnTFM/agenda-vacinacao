package br.ufg.vacina.rest.repo;

import br.ufg.vacina.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path = "usuarios", collectionResourceRel = "usuarios")
public interface UsuarioRestRepository extends JpaRepository<Usuario, Long> {

}
