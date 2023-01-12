import { v4 } from 'uuid';

const users = [
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
}

export default new UserRepository();
