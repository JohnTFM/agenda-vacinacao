package br.ufg.vacina.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Doses totais para que a vacinação seja completa
     */
    private Integer doses;

    @Enumerated(EnumType.ORDINAL)
    private Periodicidade periodicidade;

    private Integer intervalo;

}
