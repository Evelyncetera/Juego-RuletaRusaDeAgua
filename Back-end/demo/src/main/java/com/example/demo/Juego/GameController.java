package com.example.demo.Juego;


import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GameController {

    private Juego juego = new Juego(); 

    @PostMapping("/iniciar")
    public String iniciarJuego(@RequestBody List<String> nombres) {
        juego.iniciar(nombres);
        return "Juego iniciado con éxito";
    }

    @GetMapping("/disparar")
    public ResultadoDisparo disparar() {
        return juego.disparar();
    }
}