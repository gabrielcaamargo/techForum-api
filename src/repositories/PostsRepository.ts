import { query } from '../database';

interface PostsInterface {
  name: string;
  content: string;
  category: string;
  likes?: number;
  author: string;
}

class PostsRepository {
  async findAll() {
    const rows = await query('SELECT * FROM posts ORDER BY name');
    return rows;
  }

  async create({ name, content, category, author, likes }: PostsInterface) {
    const [row] = await query(`
      INSERT INTO posts(name, content, category, author, likes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, content, category, author, likes]);

    return row;
  }
}

export default new PostsRepository();
