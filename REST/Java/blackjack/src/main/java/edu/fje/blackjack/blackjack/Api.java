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
    private static ArrayList<Partida> partides = new ArrayList<>();

    public Api() {
    }


    // Funcion buscarPartida, le paso el codigo de partida y me devuelve el indice de esta en el array de partidas
    public int buscaPartida(int codiPartida){
        Partida temp = new Partida(codiPartida);
        return partides.indexOf(temp);
    }

    @POST
    @Path("/crearPartida")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String crearPartida(@FormParam("codiPartida") int codiPartida) {
        Partida partida = new Partida(codiPartida);
        partides.add(partida);
        return "Partida " + codiPartida + " creada";
    }


    @Path("/detallsPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String detallsPartida(@PathParam("codiPartida") int codiPartida) {
        return partides.get(buscaPartida(codiPartida)).toString();
    }


    @Path("/obtenirCarta/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String obtenirCarta(@PathParam("codiPartida") int codiPartida) {
        int index = buscaPartida(codiPartida);
        if(index != -1){
            return partides.get(index).pideJugador(index);
        }else{
            return "Error, la partida " + codiPartida + " no existeix";
        }
    }

    @Path("/mostraCartes/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String mostraCartes(@PathParam("codiPartida") int codiPartida) {
        int index = buscaPartida(codiPartida);
        if(index != -1){
            return partides.get(index).getCartesJugador().toString();
        }else{
            return "Error, la partida " + codiPartida + " no existeix";
        }
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
