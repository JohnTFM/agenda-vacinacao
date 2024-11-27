package br.ufg.vacina.rest.repo;

import br.ufg.vacina.modelo.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "vacinas")
public interface VacinaRestRepository extends JpaRepository<Vacina, Long> {

}
