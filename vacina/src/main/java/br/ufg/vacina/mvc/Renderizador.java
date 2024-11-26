package br.ufg.vacina.mvc;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.Charset;

@Controller
public class Renderizador  {

    private static final String CAMINHO_INDEX_HTML = "/static/index.html";

    private ResponseEntity renderizarReact(){
        ResponseEntity resposta;
        try{
         resposta = ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(
                new ClassPathResource(CAMINHO_INDEX_HTML).getContentAsString(Charset.forName("UTF-8"))
        );

        }catch (IOException e){
            return ResponseEntity.internalServerError().contentType(MediaType.TEXT_HTML).body("<h1>No Content</h1>");
        }

        return resposta;

    }


    @GetMapping(value = {
            "/{caminho:^(?!api)(?!.*\\.[a-zA-Z0-9]+$).*$}",
            "/{caminho:^(?!api)(?!.*\\.[a-zA-Z0-9]+$).*$}/{final:^(?!api)(?!.*\\.[a-zA-Z0-9]+$).*$}",
            "/{caminho:^(?!api)(?!.*\\.[a-zA-Z0-9]+$).*$}/*/{final:^(?!api)(?!.*\\.[a-zA-Z0-9]+$).*$}"
    })
    public ResponseEntity umNivelCaminho() {
        return this.renderizarReact();
    }


    @GetMapping(value = "/")
    public ResponseEntity r2() {
        return this.renderizarReact();
    }

}
