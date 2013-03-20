package com.example.sebiblog.util;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class HttpResponse implements Serializable {


    //TODO yep it's duplicated and must be refactored
    private String username;
    private Collection<String> roles;

    public HttpResponse(String id, Collection<String> roles) {
        this.username = id;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}