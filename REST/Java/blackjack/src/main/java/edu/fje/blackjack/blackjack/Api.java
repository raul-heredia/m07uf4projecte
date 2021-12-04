package edu.fje.blackjack.blackjack;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.util.ArrayList;


@Path("blackjack")
public class Api {

    @Context
    private UriInfo context;

    public Api() {
        ArrayList<Partida> partides = new ArrayList<Partida>();
        ArrayList<Carta> cartes = new ArrayList<Carta>();

        if (cartes.size() == 0){
            Carta as = new Carta("AS", 1);
            Carta dosr = new Carta("2R", 2);
            Carta tresp = new Carta("3P", 3);
            Carta cuatroc = new Carta("4C", 4);
            Carta cincot = new Carta("5T", 5);
            Carta seisr = new Carta("6R", 6);
            Carta sietep = new Carta("7P", 7);
            Carta ochoc = new Carta("8C", 8);
            Carta nuevet = new Carta("9T", 9);
            Carta diezc = new Carta("10C", 10);
            Carta j = new Carta("J", 10);
            Carta q = new Carta("Q", 10);
            Carta k = new Carta("K", 10);

            cartes.add(as);
            cartes.add(dosr);
            cartes.add(tresp);
            cartes.add(cuatroc);
            cartes.add(cincot);
            cartes.add(seisr);
            cartes.add(sietep);
            cartes.add(ochoc);
            cartes.add(nuevet);
            cartes.add(diezc);
            cartes.add(j);
            cartes.add(q);
            cartes.add(k);
        }

    }

    @POST
    @Path("/crearPartida")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response afegirAlumne(@FormParam("codiPartida") int codiPartida) {
        //ArrayList baralla = ((api)cartes.clone());
        // Partida partida = new Partida(codiPartida, baralla);

        return Response.status(200).entity("alumne creat").build();
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
