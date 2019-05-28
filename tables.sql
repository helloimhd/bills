CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email TEXT
);

CREATE TABLE IF NOT EXISTS groups (
	id SERIAL PRIMARY KEY,
	receipt_id INTEGER,
	friend_id INTEGER,
	amount FLOAT
);

CREATE TABLE IF NOT EXISTS receipts (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	group_id INTEGER,
	img_token TEXT,
	subtotal FLOAT,
	total FLOAT,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
	id SERIAL PRIMARY KEY,
	receipt_id INTEGER,
	item_name TEXT,
	price FLOAT,
	quantity INTEGER,
	users_id INTEGER ARRAY
);

ALTER TABLE items ALTER COLUMN users_id SET DEFAULT '{}';

-- psql -d bills -U Chris -f tables.sql