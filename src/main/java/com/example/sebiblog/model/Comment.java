package com.example.sebiblog.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import com.example.sebiblog.model.Post;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Comment implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id = null;
   @Version
   @Column(name = "version")
   private int version = 0;

   @Column
   private String content;

   @Column
   private String userName;

   @ManyToOne
   private Post post;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object that)
   {
      if (this == that)
      {
         return true;
      }
      if (that == null)
      {
         return false;
      }
      if (getClass() != that.getClass())
      {
         return false;
      }
      if (id != null)
      {
         return id.equals(((Comment) that).id);
      }
      return super.equals(that);
   }

   @Override
   public int hashCode()
   {
      if (id != null)
      {
         return id.hashCode();
      }
      return super.hashCode();
   }

   public String getContent()
   {
      return this.content;
   }

   public void setContent(final String content)
   {
      this.content = content;
   }

   public String getUserName()
   {
      return this.userName;
   }

   public void setUserName(final String userName)
   {
      this.userName = userName;
   }

   public String toString()
   {
      String result = "";
      if (content != null && !content.trim().isEmpty())
         result += content;
      return result;
   }

   public Post getPost()
   {
      return this.post;
   }

   public void setPost(final Post post)
   {
      this.post = post;
   }
}