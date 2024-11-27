package br.ufg.vacina.modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.*;

/**
 * É a representação de um evento de dose de vacina, ou seja, quando a pessoa for ganhar 1 dose,
 * ela deverá agendar 1 registro desses.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Ano, mês, dia, hora, minuto e segundo que a vacina foi agendada
     */
    private LocalDateTime data;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;

    /**
     * Data que a situação foi para realizada ou cancelada.
     */
    private LocalDateTime dataSituacao;

}
