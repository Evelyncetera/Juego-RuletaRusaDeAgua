package com.example.demo.Juego;

public class Jugador {
    private String id;
    private String nombre;
    private boolean mojado;

    public Jugador(String id, String nombre){
        this.id = id;
        this.nombre = nombre;
        this.mojado = false; 
    }

    public String getNombre() { 
        return nombre; 
    }
    
    public boolean isMojado() { 
        return mojado; 
    }
    
    public void setMojado(boolean mojado) { 
        this.mojado = mojado; 
    }

}
