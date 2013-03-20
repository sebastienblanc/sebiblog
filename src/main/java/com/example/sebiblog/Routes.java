/*
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.sebiblog;

import com.example.sebiblog.config.CustomMediaTypeResponder;
import com.example.sebiblog.exception.HttpSecurityException;
import com.example.sebiblog.model.Comment;
import com.example.sebiblog.rest.AuthenticationService;
import com.example.sebiblog.rest.CommentEndpoint;
import com.example.sebiblog.model.Post;
import com.example.sebiblog.rest.PostEndpoint;

import org.jboss.aerogear.controller.router.AbstractRoutingModule;
import org.jboss.aerogear.controller.router.MediaType;
import org.jboss.aerogear.controller.router.RequestMethod;
import org.jboss.aerogear.security.model.AeroGearUser;
import com.example.sebiblog.exception.Error;

public class Routes extends AbstractRoutingModule {

    @Override
    public void configuration() throws Exception {


        route().from("/comments").on(RequestMethod.POST).consumes(JSON).produces(JSON).to(CommentEndpoint.class).create(param(Comment.class));
        route().from("/comments/{id}").on(RequestMethod.DELETE).consumes(JSON).produces(JSON).to(CommentEndpoint.class).deleteById(param("id", Long.class));
        route().from("/comments/{id}").on(RequestMethod.GET).consumes(JSON).produces(JSON).to(CommentEndpoint.class).findById(param("id", Long.class));
        route().from("/comments").on(RequestMethod.GET).consumes(JSON).produces(JSON).to(CommentEndpoint.class).findByPostId(param("post_id", Long.class));
        route().from("/comments/{id}").on(RequestMethod.PUT).consumes(JSON).produces(JSON).to(CommentEndpoint.class).update(param("id", Long.class), param(Comment.class));
        route().from("/posts").on(RequestMethod.GET).consumes(JSON).produces(JSON).to(PostEndpoint.class).listAll();
        route().from("/posts").roles("admin").on(RequestMethod.POST).consumes(JSON).produces(JSON).to(PostEndpoint.class).create(param(Post.class));
        route().from("/posts/{id}").roles("admin").on(RequestMethod.DELETE).consumes(JSON).produces(JSON).to(PostEndpoint.class).deleteById(param("id", Long.class));
        route().from("/posts/{id}").on(RequestMethod.GET).consumes(JSON).produces(JSON).to(PostEndpoint.class).findById(param("id", Long.class));
        route().from("/posts/{id}").roles("admin").on(RequestMethod.PUT).consumes(JSON).produces(JSON).to(PostEndpoint.class).update(param("id", Long.class), param(Post.class));
        route()
                .from("/auth/login")
                .on(RequestMethod.POST)
                .consumes(JSON)
                .produces(CustomMediaTypeResponder.CUSTOM_MEDIA_TYPE)
                .to(AuthenticationService.class).login(param(AeroGearUser.class));
        route()
                .from("/auth/enroll")
                .on(RequestMethod.POST)
                .consumes(JSON)
                .produces(CustomMediaTypeResponder.CUSTOM_MEDIA_TYPE)
                .to(AuthenticationService.class).register(param(AeroGearUser.class));
        route()
                .from("/auth/logout")
                .on(RequestMethod.POST)
                .consumes(JSON)
                .produces(JSON)
                .to(AuthenticationService.class).logout();
        route()
                .on(HttpSecurityException.class)
                .produces(JSON)
                .to(Error.class).index(param(HttpSecurityException.class));
    }

}
