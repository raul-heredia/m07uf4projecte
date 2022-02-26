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
        this.numCarta = cartesPartida.size() - 1;
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
    public void afegeixCartaCrupier(Object carta){
        this.cartesCrupier.add(carta);
    }

    public void afegeixSumaJugador(Object carta){
        int valorCarta = (int) carta; // fem un cast del objecte a int
        this.jugadorSum += valorCarta;
    }
    public void afegeixSumaCrupier(Object carta){
        int valorCarta = (int) carta; // fem un cast del objecte a int
        this.crupierSum += valorCarta;
    }


    // Metodos blackjack
    public void reduceNumCarta(){
        this.numCarta = this.cartesPartida.size() - 1; // -1 porque empieza en 0
    }

    public Object comprovaAsJugador(Object carta){
        if((int) carta == 1){
            if (this.jugadorSum <= 10){
                return carta = 11;
            }else{
                return carta;
            }
        }else{
            return carta;
        }
    }
    public Object comprovaAsCrupier(Object carta){
        if((int) carta == 1){
            if (this.crupierSum <= 10){
                return carta = 11;
            }else{
                return carta;
            }
        }else{
            return carta;
        }
    }


    public void pideCrupier(){
        int max = this.getNumCarta() -1;
        int min = 0;
        int rand = ThreadLocalRandom.current().nextInt(min, max);
        if(this.crupierSum < 17){
            if (this.getTorn() == 1){
                for (int i = 0; i < 2; i++) { // demanem dos cartes ja que la primera vegada es donen dues cartes
                    Object carta = this.getCartesPartida().get(rand);
                    this.afegeixCartaCrupier(this.comprovaAsCrupier(carta));
                    this.afegeixSumaCrupier(this.comprovaAsCrupier(carta));
                    this.getCartesPartida().remove(rand);
                    this.reduceNumCarta();
                    if (i == 0){
                        rand = ThreadLocalRandom.current().nextInt(min, max);
                    }
                }
            }else{
                Object carta = this.getCartesPartida().get(rand);
                this.afegeixCartaCrupier(this.comprovaAsCrupier(carta));
                this.afegeixSumaCrupier(this.comprovaAsCrupier(carta));
                this.getCartesPartida().remove(rand);
                this.reduceNumCarta();
            }
        }
    }


    public String pideJugador(){
        int max = this.getNumCarta() -1;
        int min = 0;
        int rand = ThreadLocalRandom.current().nextInt(min, max);
        this.pideCrupier();
        if (this.getTorn() == 1){
            for (int i = 0; i < 2; i++) { // demanem dos cartes ja que la primera vegada es donen dues cartes
                Object carta = this.getCartesPartida().get(rand);
                this.afegeixCartaJugador(this.comprovaAsJugador(carta));
                this.afegeixSumaJugador(this.comprovaAsJugador(carta));
                this.getCartesPartida().remove(rand);
                this.reduceNumCarta();
                if (i == 0){
                    rand = ThreadLocalRandom.current().nextInt(min, max);
                }
            }
            this.sumaTorn();
            return this.getCartesJugador().toString();
        }else{
            Object carta = this.getCartesPartida().get(rand);
            this.afegeixCartaJugador(this.comprovaAsJugador(carta));
            this.afegeixSumaJugador(this.comprovaAsJugador(carta));
            this.sumaTorn();
            this.getCartesPartida().remove(rand);
            this.reduceNumCarta();
            return carta.toString();
        }
    }

    public String guanya(){
        return "Has Guanyat!";
    }
    public String perd(){
        return "Has Perdut";
    }


    public String comprovaResultat(){
        if (this.crupierSum < this.jugadorSum && this.jugadorSum < 21) {
            return guanya();
        } else if (this.crupierSum > 21 && this.jugadorSum < 21) {
            return guanya();
        } else if (this.jugadorSum == 21 && (this.crupierSum < 21 || this.crupierSum > 21)) {
            return "Blackjack! Has Guanyat";
        } else if (this.crupierSum == 21 && (this.jugadorSum < 21 || this.jugadorSum > 21)) {
            return "Crupier Blackjack! Has Perdut";
        } else if (this.jugadorSum > 21) {
            return perd();
        } else if (this.jugadorSum < this.crupierSum && this.crupierSum < 21) {
            return perd();
        } else if (this.jugadorSum == this.crupierSum) {
            return "Hi ha un empat";
        }else{
            return "";
        }
    }

    public String plantarse(){
        this.torn = -1;
        return this.comprovaResultat();
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
