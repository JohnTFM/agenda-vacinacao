package br.ufg.vacina.rest.repo;

import java.time.LocalDate;
import java.util.List;

import br.ufg.vacina.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.ufg.vacina.modelo.Agenda;
import br.ufg.vacina.modelo.Situacao;

@RepositoryRestResource(path = "agendas")
public interface AgendaRestRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findBySituacao(Situacao situacao);

    List<Agenda> findByData(LocalDate data);

    default List<Agenda> findAgendasTodaySorted() {
        LocalDate hoje = LocalDate.now();
        List<Agenda> agendas = findByData(hoje);
        agendas.sort((a1, a2) -> a1.getSituacao().compareTo(a2.getSituacao()));
        return agendas;
    }

    List<Agenda> findByUsuario(Usuario usuario);
}
