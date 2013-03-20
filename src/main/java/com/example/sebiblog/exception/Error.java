package com.example.sebiblog.exception;

/**
 * Created with IntelliJ IDEA.
 * User: sebastien
 * Date: 3/19/13
 * Time: 9:24 AM
 * To change this template use File | Settings | File Templates.
 */
public class Error {
    public String index(HttpSecurityException exception) {
        return "Not authorized " + exception;
    }

}
