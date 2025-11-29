package com.example.demo.Juego;


public class ResultadoDisparo {
    

    private String mensaje;
    private boolean juegoTerminado;
    private String jugador;
    private int posicionTambor;
    
    public ResultadoDisparo() { // constructor vacio
    }
    //getters y setters 
    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public boolean isJuegoTerminado() {
        return juegoTerminado;
    }

    public void setJuegoTerminado(boolean juegoTerminado) {
        this.juegoTerminado = juegoTerminado;
    }

    public String getJugador() {
        return jugador;
    }

    public void setJugador(String jugador) {
        this.jugador = jugador;
    }
    
    public int getPosicionTambor() {
        return posicionTambor;
    }

    public void setPosicionTambor(int posicionTambor) {
        this.posicionTambor = posicionTambor;
    }
}
