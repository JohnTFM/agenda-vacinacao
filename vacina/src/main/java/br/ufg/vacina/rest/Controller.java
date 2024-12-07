package br.ufg.vacina.rest;

import br.ufg.vacina.modelo.*;
import br.ufg.vacina.rest.records.UsuarioDTO;
import br.ufg.vacina.rest.repo.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Controller {

    private final UsuarioRestRepository usuarioRestRepository;
    private final VacinaRestRepository vacinaRestRepository;
    private final AgendaRestRepository agendaRestRepository;
    private final AlergiaRestRepository alergiaRestRepository;


    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioRestRepository.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRestRepository.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioRestRepository.save(usuario));
    }

    @PostMapping("/usuarios-com-alergia")
    @Transactional
    public ResponseEntity<Usuario> createUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario;

        if (usuarioDTO.getId() != null) {
            usuario = usuarioRestRepository.findById(usuarioDTO.getId()).orElse(new Usuario());
        } else {
            usuario = new Usuario();
        }

        usuario.setNome(usuarioDTO.getNome());
        usuario.setDataNascimento(usuarioDTO.getDataNascimento());
        usuario.setSexo(usuarioDTO.getSexo());
        usuario.setLogradouro(usuarioDTO.getLogradouro());
        usuario.setNumero(usuarioDTO.getNumero());
        usuario.setSetor(usuarioDTO.getSetor());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setUf(usuarioDTO.getUf());

        // Busca as alergias pelo ID
        var alergias = alergiaRestRepository.findAllById(
                usuarioDTO.getAlergias().stream().map(Long::valueOf).toList()
        );

        // Limpa as alergias existentes e atualiza
        usuario.getAlergias().clear();
        usuarioRestRepository.save(usuario);

        alergias.forEach(usuario::addAlergia); // Atualiza ambos os lados

        // Salva o usuário
        usuarioRestRepository.save(usuario);

        return ResponseEntity.ok(usuario);
    }




    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> existingUsuario = usuarioRestRepository.findById(id);
        if (existingUsuario.isPresent()) {
            usuario.setId(id);
            return ResponseEntity.ok(usuarioRestRepository.save(usuario));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (usuarioRestRepository.existsById(id)) {
            usuarioRestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // CRUD for Vacina

    @GetMapping("/vacinas")
    public ResponseEntity<List<Vacina>> getAllVacinas() {
        List<Vacina> vacinas = vacinaRestRepository.findAll();
        return ResponseEntity.ok(vacinas);
    }

    @GetMapping("/vacinas/{id}")
    public ResponseEntity<Vacina> getVacinaById(@PathVariable Long id) {
        Optional<Vacina> vacina = vacinaRestRepository.findById(id);
        return vacina.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/vacinas")
    public ResponseEntity<Vacina> createVacina(@RequestBody Vacina vacina) {
        return ResponseEntity.ok(vacinaRestRepository.save(vacina));
    }

    @PutMapping("/vacinas/{id}")
    public ResponseEntity<Vacina> updateVacina(@PathVariable Long id, @RequestBody Vacina vacina) {
        Optional<Vacina> existingVacina = vacinaRestRepository.findById(id);
        if (existingVacina.isPresent()) {
            vacina.setId(id);
            return ResponseEntity.ok(vacinaRestRepository.save(vacina));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/vacinas/{id}")
    public ResponseEntity<Void> deleteVacina(@PathVariable Long id) {
        if (vacinaRestRepository.existsById(id)) {
            vacinaRestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // CRUD for Agenda

    @GetMapping("/agendas")
    public ResponseEntity<List<Agenda>> getAllAgendas() {
        List<Agenda> agendas = agendaRestRepository.findAll();
        return ResponseEntity.ok(agendas);
    }

    @GetMapping("/agendas/{id}")
    public ResponseEntity<Agenda> getAgendaById(@PathVariable Long id) {
        Optional<Agenda> agenda = agendaRestRepository.findById(id);
        return agenda.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/agendas")
    public ResponseEntity<Agenda> createAgenda(@RequestBody Agenda agenda) {
        return ResponseEntity.ok(agendaRestRepository.save(agenda));
    }

    @PutMapping("/agendas/{id}")
    public ResponseEntity<Agenda> updateAgenda(@PathVariable Long id, @RequestBody Agenda agenda) {
        Optional<Agenda> existingAgenda = agendaRestRepository.findById(id);
        if (existingAgenda.isPresent()) {
            agenda.setId(id);
            return ResponseEntity.ok(agendaRestRepository.save(agenda));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/agendas/{id}")
    public ResponseEntity<Void> deleteAgenda(@PathVariable Long id) {
        if (agendaRestRepository.existsById(id)) {
            agendaRestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/agendas/hoje")
    public ResponseEntity<List<Agenda>> getAgendasDoDia() {
        List<Agenda> agendas = agendaRestRepository.findAgendasTodaySorted();
        return ResponseEntity.ok(agendas);
    }

    // CRUD for Alergia

    @GetMapping("/alergias")
    public ResponseEntity<List<Alergia>> getAllAlergias() {
        List<Alergia> alergias = alergiaRestRepository.findAll();
        return ResponseEntity.ok(alergias);
    }

    @GetMapping("/alergias/{id}")
    public ResponseEntity<Alergia> getAlergiaById(@PathVariable Long id) {
        Optional<Alergia> alergia = alergiaRestRepository.findById(id);
        return alergia.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/alergias")
    public ResponseEntity<Alergia> createAlergia(@RequestBody Alergia alergia) {
        return ResponseEntity.ok(alergiaRestRepository.save(alergia));
    }

    @PutMapping("/alergias/{id}")
    public ResponseEntity<Alergia> updateAlergia(@PathVariable Long id, @RequestBody Alergia alergia) {
        Optional<Alergia> existingAlergia = alergiaRestRepository.findById(id);
        if (existingAlergia.isPresent()) {
            alergia.setId(id);
            return ResponseEntity.ok(alergiaRestRepository.save(alergia));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/alergias/{id}")
    public ResponseEntity<Void> deleteAlergia(@PathVariable Long id) {
        if (alergiaRestRepository.existsById(id)) {
            alergiaRestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
