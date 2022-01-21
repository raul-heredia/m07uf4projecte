package edu.fje.blackjack.blackjack;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Path("blackjack")
public class Api {

    @Context
    private UriInfo context;
    private static List<Carta> cartes = new ArrayList<>();
    private static List<Partida> partides = new ArrayList<>();

    public Api() {
        if (cartes.size() == 0){ // añadimos una baraja de 12 cartas al arraylist
            cartes.add(new Carta("AS", 1));
            cartes.add(new Carta("2R", 2));
            cartes.add(new Carta("3P", 3));
            cartes.add(new Carta("4C", 4));
            cartes.add(new Carta("5T", 5));
            cartes.add(new Carta("6R", 6));
            cartes.add(new Carta("7P", 7));
            cartes.add(new Carta("8C", 8));
            cartes.add(new Carta("9T", 9));
            cartes.add(new Carta("10C", 10));
            cartes.add(new Carta("J", 10));
            cartes.add(new Carta("Q", 10));
            cartes.add(new Carta("K", 10));
        }
        partides.add(new Partida(1, (ArrayList) cartes));
    }

    @Path("/consultarPartides")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String consultarTotsAlumnes() {
        return partides.toString();
    }


    @GET
    @Path("/consultarPartida/{codiPartida}")
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarPartida(@PathParam("codiPartida") int codiPartida) {
        Partida partida = partides.stream().filter(a -> a.getCodiPartida() == codiPartida).collect(Collectors.toList()).get(0);
        return partida.toString();
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
