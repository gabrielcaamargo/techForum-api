import { v4 } from 'uuid';

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
  findAll() {
    return new Promise(resolve => resolve(users));
  }

  findById(id: string) {
    return new Promise((resolve) => resolve(
      users.find(user => user.id === id)
    ));
  }

  findByUsername(username: string) {
    return new Promise((resolve) => resolve(
      users.find(user => user.username === username)
    ));
  }

  findByInstagram(instagram: string) {
    return new Promise((resolve) => resolve(
      users.find(user => user.instagram === instagram)
    ));
  }

  create({username, followers, instagram}: createParameters) {
    return new Promise<createParameters>((resolve) => {
      const newUser = {
        id: v4(),
        username,
        followers,
        instagram
      };

      users.push(newUser);
      resolve(newUser);
    });
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
