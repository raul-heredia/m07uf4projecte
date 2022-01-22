package edu.fje.blackjack.blackjack;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Path("blackjack")
public class Api {

    @Context

    private UriInfo context;
    private static List<Integer> cartes = new ArrayList<Integer>();
    private static List<Partida> partides = new ArrayList<>();

    public Api() {
        if (cartes.size() == 0){ // añadimos una baraja de 12 cartas al arraylist
            for ( int i = 1; i<11; i++){
                cartes.add(i);
                if (i == 10){
                    cartes.add(10);
                    cartes.add(10);
                }
            }

        }
        if (partides.size() == 0){
            ArrayList<Integer> ctemp = new ArrayList<>(cartes);
            partides.add(new Partida(1, (ArrayList) ctemp));
        }
    }

    public int buscaPartida(int codiPartida){
        Partida temp = new Partida(codiPartida);
        return partides.indexOf(temp);
    }

    public void demanaJugador(int codiPartida){
        Random rand = new Random();
        int pos = buscaPartida(codiPartida);
        Partida partida = partides.get(pos);
        if( pos >= 0){
            int numCarta = partida.getNumCarta();
            int carta = rand.nextInt(numCarta); // Treiem un numero entre 0 i numCarta
            partida.setCartesJugador(partida.treureCarta(carta));
            partida.eliminarCarta(rand.nextInt(carta));
        };
    }



    @Path("/consultarPartides")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String consultarTotsAlumnes() {
        return partides.toString();
    }

    @Path("/test")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String test() {
        Partida temp = new Partida(1);
        int pos = partides.indexOf(temp);
        partides.get(pos).treureCarta(0);
        return partides.get(pos).toString();
    }

    @Path("/test2")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String test2() {
        return cartes.toString();
    }


    @Path("/detallsPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String detallsPartida(@PathParam("codiPartida") int codiPartida) {
        return partides.get(buscaPartida(codiPartida)).toString();
    }

    @POST
    @Path("/crearPartida")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String crearPartida(@FormParam("codiPartida") int codiPartida) {
        Partida partida = new Partida(codiPartida, (ArrayList) cartes);
        partides.add(partida);
        return "Partida " + codiPartida + " creada";
    }

    @Path("/obtenirCarta/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public void obtenirCarta(@PathParam("codiPartida") int codiPartida) {
        demanaJugador(codiPartida);

        //int pos = buscaPartida(codiPartida);
        //Partida partida = partides.get(pos);
        //return partida.getCartesJugador();
    }


    /*@Path("/consultarTOTS")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String consultarTotsAlumnes() {
        return alumnes.toString();
    }

    @Path("/consultarUn/{id}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarTotsAlumnes(@PathParam("id") int id) {
        Alumne temp = new Alumne(id, "", 0);
        int pos = alumnes.indexOf(temp);
        return alumnes.get(pos).toString();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void modificarAlumne(String content) {
    }

    @POST
    @Path("/afegirAlumne")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response afegirAlumne(@FormParam("id") int id,
                                 @FormParam("nom") String nom, @FormParam("nota") int nota) {

        alumnes.add(new Alumne(id, nom, nota));
        return Response.status(200).entity("alumne creat").build();
    }
    
    @Path("/esborrarAlumne/{id}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public void esborrarAlumne(@PathParam("id") int id) {
        Alumne temp = new Alumne(id, "", 0);
        int pos = alumnes.indexOf(temp);
        alumnes.remove(pos);
    }*/
    
}
