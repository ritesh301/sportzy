CREATE DATABASE pla;

CREATE TABLE plain (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    data BYTEA NOT NULL
);
