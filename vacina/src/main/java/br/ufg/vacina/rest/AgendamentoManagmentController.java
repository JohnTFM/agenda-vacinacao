package br.ufg.vacina.rest;

import br.ufg.vacina.modelo.Agenda;
import br.ufg.vacina.modelo.Situacao;
import br.ufg.vacina.modelo.Usuario;
import br.ufg.vacina.rest.records.AgendaRecord;
import br.ufg.vacina.rest.records.UsuarioRecord;
import br.ufg.vacina.rest.records.DarBaixaRecord;
import br.ufg.vacina.rest.repo.AgendaRestRepository;
import br.ufg.vacina.rest.repo.UsuarioRestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AgendamentoManagmentController {

    private final AgendaRestRepository agendaRestRepository;
    private final UsuarioRestRepository usuarioRestRepository;

    //Item 5
    @PostMapping("/agendas/dar-baixa")
    public ResponseEntity<Agenda> darBaixa(@RequestBody DarBaixaRecord darBaixaRecord) {
        Agenda agenda = agendaRestRepository.findById(darBaixaRecord.id()).orElseThrow();
        agenda.setSituacao(Situacao.REALIZADO);
        agenda.setData(LocalDate.now());
        agenda.setHora(LocalTime.now());
        return ResponseEntity.ok(agenda);
    }

    //Item 6
    @GetMapping("/usuarios/meus-agendamentos/{usuarioId}")
    public ResponseEntity<UsuarioRecord> meusAgendamentos(@PathVariable("usuarioId") Long ususarioId){

        Usuario usuario = usuarioRestRepository.findById(ususarioId).orElseThrow();

        List<Agenda> agendas = agendaRestRepository.findByUsuario(usuario);

        List<AgendaRecord> agendaRecords = new ArrayList<>();

        for (int i = 0; i < agendas.size(); i++) {
            Agenda agenda = agendas.get(i);
            agendaRecords.add(new AgendaRecord(
                    agenda.getData(),
                    agenda.getHora(),
                    agenda.getSituacao(),
                    i
            ));
        }

        UsuarioRecord usuarioRecord = new UsuarioRecord(
                usuario.getNome(),
                agendaRecords
        );

        return ResponseEntity.ok(usuarioRecord);
    }

}
