import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';

class UserController {
  async index(request: Request, response: Response) {
    // List all registers
    const users = await UserRepository.findAll();

    response.json(users);
  }

  show() {
    // List one register
  }

  store() {
    // Create a register
  }

  update() {
    // Update a register
  }

  delete() {
    // Delete one register
  }
}

export default new UserController();
