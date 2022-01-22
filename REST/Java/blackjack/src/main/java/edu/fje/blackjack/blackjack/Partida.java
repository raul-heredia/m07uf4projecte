package edu.fje.blackjack.blackjack;

import java.util.ArrayList;

public class Partida {
    private int codiPartida, torn, numCarta, jugadorSum, crupierSum;
    private ArrayList cartesJugador, cartesCrupier, cartes;

    public Partida(int codiPartida){
        this.codiPartida = codiPartida;
    }

    public Partida(int codiPartida, ArrayList cartes) {
        this.codiPartida = codiPartida;
        this.torn = 1;
        this.numCarta = 12;
        this.jugadorSum = 0;
        this.crupierSum = 0;
        this.cartesJugador = new ArrayList<Partida>();
        this.cartesCrupier = new ArrayList<Partida>();;
        this.cartes = cartes;
    }

    public int getCodiPartida() {
        return codiPartida;
    }

    public void setCodiPartida(int codiPartida) {
        this.codiPartida = codiPartida;
    }

    public int getTorn() {
        return torn;
    }

    public void setTorn(int torn) {
        this.torn = torn;
    }

    public int getNumCarta() {
        return numCarta;
    }

    public void setNumCarta(int numCarta) {
        this.numCarta = numCarta;
    }

    public int getJugadorSum() {
        return jugadorSum;
    }

    public void setJugadorSum(int jugadorSum) {
        this.jugadorSum = jugadorSum;
    }

    public int getCrupierSum() {
        return crupierSum;
    }

    public void setCrupierSum(int crupierSum) {
        this.crupierSum = crupierSum;
    }

    public ArrayList getCartesJugador() {
        return cartesJugador;
    }

    public void setCartesJugador(ArrayList cartesJugador) {
        this.cartesJugador = cartesJugador;
    }

    public ArrayList getCartesCrupier() {
        return cartesCrupier;
    }

    public void setCartesCrupier(ArrayList cartesCrupier) {
        this.cartesCrupier = cartesCrupier;
    }

    public ArrayList getCartes() {
        return cartes;
    }

    public void setCartes(ArrayList cartes) {
        this.cartes = cartes;
    }

    @Override
    public String toString() {
        return "{" +
                "codiPartida=" + codiPartida +
                ", torn=" + torn +
                ", numCarta=" + numCarta +
                ", jugadorSum=" + jugadorSum +
                ", crupierSum=" + crupierSum +
                ", cartesJugador=" + cartesJugador +
                ", cartesCrupier=" + cartesCrupier +
                ", cartes=" + cartes +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Partida other = (Partida) obj;
        if (this.codiPartida != other.codiPartida) {
            return false;
        }
        return true;
    }

    public void treureCarta(int n){
        this.cartes.remove(n);
    }
}
