package br.ufg.vacina.rest.records;

import java.util.List;

//agendamentos do usuário (data, situação, vacina e dose). Ela
public record UsuarioRecord(
        String nomeUsuario,
        List<AgendaRecord> agendamentos
) {
}
