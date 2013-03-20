package com.example.sebiblog.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.example.sebiblog.model.Comment;

/**
 * 
 */
@Stateless
@Path("/comments")
public class CommentEndpoint
{
   @PersistenceContext(unitName = "forge-default")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(Comment entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(CommentEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id")
   Long id)
   {
      Comment entity = em.find(Comment.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id")
   Long id)
   {
      Comment entity = em.find(Comment.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      return Response.ok(entity).build();
   }

   @GET
   @Produces("application/json")
   public List<Comment> listAll()
   {
      final List<Comment> results = em.createQuery("FROM Comment", Comment.class).getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(@PathParam("id")
   Long id, Comment entity)
   {
      entity.setId(id);
      entity = em.merge(entity);
      return Response.noContent().build();
   }

    public List<Comment> findByPostId(Long postId) {
        final List<Comment> results = em.createQuery("FROM Comment c WHERE c.post.id= :postId", Comment.class)
                .setParameter("postId", postId)
                .getResultList();
        return results;
    }
}