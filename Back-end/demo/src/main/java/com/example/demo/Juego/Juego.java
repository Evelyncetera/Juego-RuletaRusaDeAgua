package com.example.demo.Juego;

import java.util.ArrayList;
import java.util.List;


public class Juego {
    private List<Jugador> jugadores;
    private RevolverDeAgua revolver;
    private int turnoActual; 

    public Juego (){
        this.jugadores = new ArrayList<>();
        this.revolver = new RevolverDeAgua();
        this.turnoActual = 0;
    }

    public void iniciar(List<String> nombres) {
        jugadores.clear();
        for (int i = 0; i < nombres.size(); i++) {
            jugadores.add(new Jugador(String.valueOf(i+1), nombres.get(i)));
        }
        revolver = new RevolverDeAgua();
        turnoActual = 0;
    }

    public ResultadoDisparo disparar() {
        Jugador jugadorActual = jugadores.get(turnoActual);
        boolean seMojo = revolver.mojar();

        ResultadoDisparo resultado = new ResultadoDisparo();
        resultado.setJugador(jugadorActual.getNombre());
        resultado.setPosicionTambor(revolver.getPosicionActual()); // Para la animación

        if (seMojo) {
            jugadorActual.setMojado(true);
            resultado.setMensaje("¡" + jugadorActual.getNombre() + " SE MOJÓ! Fin del juego.");
            resultado.setJuegoTerminado(true);
        } else {
            resultado.setMensaje("¡Click! " + jugadorActual.getNombre() + " se salvó.");
            resultado.setJuegoTerminado(false);
            revolver.siguienteChorro();
            pasarTurno();
        }
        
        return resultado;
    }

    private void pasarTurno () {
        turnoActual++;
        if(turnoActual >= jugadores.size()){
            turnoActual = 0;
        }
    }

}
