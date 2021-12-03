
package edu.fje.blackjack.blackjack;


class Alumne {
   private int id;
   private String nom;
   private int nota;

    public Alumne(int id, String nom, int nota) {
        this.id = id;
        this.nom = nom;
        this.nota = nota;
    }

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public int getNota() {
        return nota;
    }

    @Override
    public String toString() {
        return "Alumne{" + "id=" + id + ", nom=" + nom + ", nota=" + nota + '}';
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
        final Alumne other = (Alumne) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }
   
}
