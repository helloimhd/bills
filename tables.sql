-- create pokemons table
CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	name TEXT,
	price TEXT,
	description TEXT
);