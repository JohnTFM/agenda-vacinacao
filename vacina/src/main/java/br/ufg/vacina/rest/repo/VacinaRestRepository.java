package br.ufg.vacina.rest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.ufg.vacina.modelo.Vacina;

@RepositoryRestResource(path = "vacinas")
public interface VacinaRestRepository extends JpaRepository<Vacina, Long> {

}
