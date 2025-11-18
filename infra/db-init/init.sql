CREATE TABLE theatre (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255),
                       capacity INT
);

INSERT INTO theatre (name, capacity) VALUES
                                       ('Grand Theatre', 500),
                                       ('Petit Theatre', 120);
