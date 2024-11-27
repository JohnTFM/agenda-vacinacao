package br.ufg.vacina.rest.repo;

import br.ufg.vacina.modelo.Agenda;
import br.ufg.vacina.modelo.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "agendas")
public interface AgendaRestRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findBySituacao(Situacao situacao);

}
