package edu.fje.blackjack.blackjack;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class Partida {
    private int codiPartida, torn, numCarta, jugadorSum, crupierSum;
    private ArrayList cartesJugador, cartesCrupier, cartesPartida;

    public Partida(int codiPartida) {
        this.codiPartida = codiPartida;
        this.torn = 1;
        this.cartesPartida = new ArrayList<Integer>(Arrays.asList(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,10,10,10,10,10)); // Equivalent a dues baralles
        this.jugadorSum = 0;
        this.crupierSum = 0;
        this.cartesJugador = new ArrayList<Partida>();
        this.cartesCrupier = new ArrayList<Partida>();
        this.numCarta = 26;
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

    public ArrayList getCartesPartida() {
        return cartesPartida;
    }

    public void setCartesPartida(ArrayList cartesPartida) {
        this.cartesPartida = cartesPartida;
    }


    // Metodos que usa la logica de blackjack

    public void sumaTorn(){
        this.torn ++;
    }

    public void afegeixCartaJugador(Object carta){
        this.cartesJugador.add(carta);
    }

    public void afegeixSumaJugador(Object carta){
        int valorCarta = (int) carta; // fem un cast del objecte a int
        this.jugadorSum += valorCarta;
    }


    // Metodos blackjack
    public void reduceNumCarta(){
        this.numCarta --;
    }



    public String pideJugador(int indexPartida){
        int max = this.getNumCarta();
        int min = 0;
        int rand = ThreadLocalRandom.current().nextInt(min, max + 1);
        if (this.getTorn() == 1){
            for (int i = 0; i < 2; i++) { // demanem dos cartes ja que la primera vegada es donen dues cartes
                Object carta = this.getCartesPartida().get(rand);
                this.afegeixCartaJugador(carta);
                this.afegeixSumaJugador(carta);
                this.sumaTorn();
                this.getCartesPartida().remove(rand);
                this.reduceNumCarta();
                if (i == 0){
                    rand = ThreadLocalRandom.current().nextInt(min, max + 1);
                }
            }
            return this.getCartesJugador().toString();
        }else{
            Object carta = this.getCartesPartida().get(rand);
            this.afegeixCartaJugador(carta);
            this.afegeixSumaJugador(carta);
            this.sumaTorn();
            this.getCartesPartida().remove(rand);
            this.reduceNumCarta();
            return carta.toString();
        }
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
                ", cartesPartida=" + cartesPartida +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Partida)) return false;
        Partida partida = (Partida) o;
        return getCodiPartida() == partida.getCodiPartida();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCodiPartida());
    }
}
