import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'techforum'
});

client.connect();

export async function query (query: string, values?: any) {
  const { rows } = values
    ? await client.query(query, values)
    : await client.query(query);
  return rows;
}
