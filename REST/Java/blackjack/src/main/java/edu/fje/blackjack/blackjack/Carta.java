package edu.fje.blackjack.blackjack;

public class Carta {
    private String nom;
    private int value;

    public Carta(String nom, int value) {
        this.nom = nom;
        this.value = value;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "{" +
                "nom='" + nom + '\'' +
                ", value=" + value +
                '}';
    }
}
