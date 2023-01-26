CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);