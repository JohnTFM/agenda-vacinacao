package br.ufg.vacina.rest.repo;

import br.ufg.vacina.modelo.Alergia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path = "alergias")
public interface AlergiaRestRepository extends JpaRepository<Alergia, Long> {

}
