package br.ufg.vacina.rest;

import br.ufg.vacina.modelo.Agenda;
import br.ufg.vacina.modelo.Alergia;
import br.ufg.vacina.modelo.Usuario;
import br.ufg.vacina.modelo.Vacina;
import br.ufg.vacina.rest.repo.AgendaRestRepository;
import br.ufg.vacina.rest.repo.AlergiaRestRepository;
import br.ufg.vacina.rest.repo.UsuarioRestRepository;
import br.ufg.vacina.rest.repo.VacinaRestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DominioCreateUpdateController {

    private final UsuarioRestRepository usuarioRestRepository;
    private final VacinaRestRepository vacinaRestRepository;
    private final AgendaRestRepository agendaRestRepository;
    private final AlergiaRestRepository alergiaRestRepository;

    @PostMapping("/usuarios")
    @PutMapping("/usuarios")
    public ResponseEntity<Usuario> salvarNovo(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(
                usuarioRestRepository.save(usuario)
        );
    }

    @PostMapping("/vacinas")
    @PutMapping("/vacinas")
    public ResponseEntity<Vacina> salvarNovo(@RequestBody Vacina vacina) {
        return ResponseEntity.ok(
                vacinaRestRepository.save(vacina)
        );
    }

    @PostMapping("/agendas")
    @PutMapping("/agendas")
    public ResponseEntity<Agenda> salvarNovo(@RequestBody Agenda agenda) {
        return ResponseEntity.ok(
                agendaRestRepository.save(agenda)
        );
    }

    @PostMapping("/alergias")
    @PutMapping("/alergias")
    public ResponseEntity<Alergia> salvarNova(@RequestBody Alergia alergia) {
        return ResponseEntity.ok(
                alergiaRestRepository.save(alergia)
        );
    }

}
