package br.ufg.vacina.modelo;

import jakarta.persistence.EnumType;

public @interface Enumerated {

    EnumType value();

}
