import { v4 } from 'uuid';

let users = [
  {
    id: v4(),
    name: 'Gabriel',
    followers: 24,
    instagram: 'gabcamargo',
    category_id: v4(),
  },
];

class UserRepository {
  findAll() {
    return new Promise(resolve => resolve(users));
  }

  findById(id: string) {
    return new Promise((resolve) => resolve(
      users.find(user => user.id === id)
    ));
  }

  delete(id: string) {
    return new Promise<void>((resolve) => {
      users = users.filter(user => user.id !== id);
      resolve();
    });
  }
}

export default new UserRepository();
