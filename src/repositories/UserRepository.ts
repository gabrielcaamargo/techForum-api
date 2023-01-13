import { ParsedQs } from 'qs';
import { v4 } from 'uuid';

import { query } from '../database';

let users = [
  {
    id: v4(),
    username: 'gabcamargo',
    followers: 24,
    instagram: 'gabcamargo'
  },
];

interface createParameters {
  username: string;
  followers: number;
  instagram: string
}

class UserRepository {
  async findAll(orderBy: any  = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`SELECT * FROM users ORDER BY username ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM USERS WHERE id = $1', [id]);
    return row;
  }

  async findByUsername(username: string) {
    const [row] = await query('SELECT * FROM USERS WHERE username = $1', [username]);
    return row;
  }

  async findByInstagram(instagram: string) {
    const [row] = await query('SELECT * FROM USERS WHERE instagram = $1', [instagram]);
    return row;
  }

  async create({username, followers, instagram}: createParameters) {
    const [row] = await query(`
      INSERT INTO users(username, followers, instagram)
      VALUES($1, $2, $3)
      RETURNING *
    `, [username, followers, instagram]);

    return row;
  }

  update(id: string, {username, followers, instagram}: createParameters) {
    return new Promise<createParameters>((resolve) => {
      const updatedUser = {
        id,
        username,
        followers,
        instagram
      };

      users = users.map(user => (
        user.id === id ? updatedUser : user
      ));

      resolve(updatedUser);
    });

  }

  delete(id: string) {
    return new Promise<void>((resolve) => {
      users = users.filter(user => user.id !== id);
      resolve();
    });
  }

}

export default new UserRepository();
