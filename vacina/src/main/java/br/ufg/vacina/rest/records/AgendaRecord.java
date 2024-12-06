package br.ufg.vacina.rest.records;

import br.ufg.vacina.modelo.Situacao;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendaRecord(
        LocalDate data,
        LocalTime hora,
        Situacao situacao,
        int dose
) {
}
