package com.example.demo.Juego;


public class RevolverDeAgua {
    private int posicionActual; 
    private int posicionAgua;


    public RevolverDeAgua(){
        this.posicionActual = (int) (Math.random() * 6) + 1;
        this.posicionAgua = (int) (Math.random() *6) + 1;
    }

    public boolean mojar (){
        return posicionActual == posicionAgua;
    }

    public void siguienteChorro(){
        if(posicionActual == 6){
            posicionActual = 1;
        }else{
            posicionActual++;
        }
    }

    public int getPosicionActual(){return posicionActual;}
    public int getPosicionAgua(){return posicionAgua;
        
    }

}