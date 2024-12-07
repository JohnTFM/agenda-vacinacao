package br.ufg.vacina.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private LocalDate dataNascimento;
    private Character sexo;
    private String logradouro;
    private Integer numero;
    private String setor;
    private String cidade;
    private String uf;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    private List<Alergia> alergias;

    public List<Alergia> getAlergias() {
        if(alergias == null) {
            return new ArrayList<>();
        }
        return alergias;
    }

    public void addAlergia(Alergia alergia) {
        if(alergias == null) {
            return;
        }
        this.alergias.add(alergia);
        alergia.getUsuarios().add(this);
    }

}