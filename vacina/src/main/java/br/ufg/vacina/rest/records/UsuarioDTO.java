package br.ufg.vacina.rest.records;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String nome;
    private LocalDate dataNascimento;
    private Character sexo;
    private String logradouro;
    private Integer numero;
    private String setor;
    private String cidade;
    private String uf;
    private List<String> alergias;

}
