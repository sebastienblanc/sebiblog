package com.example.sebiblog.rest;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ResponseHeaders {

    private Map<String, String> headers = new HashMap<String, String>();

    public ResponseHeaders(final String name, final String value) {
        headers.put(name, value);
    }

    public Map<String, String> getHeaders() {
        return Collections.unmodifiableMap(headers);
    }
}