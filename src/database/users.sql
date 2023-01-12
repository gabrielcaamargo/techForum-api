CREATE DATABASE techforum;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL UNIQUE,
  instagram VARCHAR NOT NULL UNIQUE,
  followers INTEGER NOT NULL
);

CREATE TYPE categoryType as ENUM ('React', 'Node', 'Javascript', 'Typescript', 'React Native');

CREATE TABLE IF NOT EXISTS posts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  content VARCHAR NOT NULL,
  category categoryType NOT NULL,
  likes INTEGER NOT NULL,
  author VARCHAR NOT NULL,
  author_id UUID,
  FOREIGN KEY(author_id) REFERENCES users(id)
);
