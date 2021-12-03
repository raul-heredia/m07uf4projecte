package edu.fje.blackjack.blackjack;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.util.ArrayList;
import java.util.List;


@Path("blackjack")
public class Api {

    @Context
    private UriInfo context;
    private static List<Alumne> alumnes = new ArrayList<>();

    public Api() {

        if (alumnes.size() == 0) {
            alumnes.add(new Alumne(1, "SERGI", 8));
            alumnes.add(new Alumne(2, "JOAN", 7));
            alumnes.add(new Alumne(3, "ANNA", 6));
        }
    }

    @Path("/consultarTOTS")
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
    }
    
}
