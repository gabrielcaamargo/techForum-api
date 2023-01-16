import { query } from '../database';
interface createParameters {
  username: string;
  followers: number;
}

class UserRepository {
  async findAll(orderBy: any  = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`SELECT * FROM users ORDER BY username ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM users WHERE id = $1', [id]);
    return row;
  }

  async findByUsername(username: string) {
    const [row] = await query('SELECT * FROM users WHERE username = $1', [username]);
    return row;
  }

  async create({username, followers}: createParameters) {
    const [row] = await query(`
      INSERT INTO users(username, followers)
      VALUES($1, $2)
      RETURNING *
    `, [username, followers]);

    return row;
  }

  async update(id: string, {username, followers}: createParameters) {
    const [row] = await query(`
      UPDATE users
      SET username = $1, followers = $2
      WHERE id = $3
    `, [username, followers, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }

}

export default new UserRepository();
