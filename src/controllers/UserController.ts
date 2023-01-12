import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';

class UserController {
  async index(request: Request, response: Response) {
    // List all registers

    const users = await UserRepository.findAll();

    response.json(users);
  }

  async show(request: Request, response: Response) {
    // List one register

    const { id } = request.params;
    const user = await UserRepository.findById(id);

    if(!user) {
      return response.status(404).json({ error: 'User not found'});
    }

    response.json(user);
  }

  store() {
    // Create a register
  }

  update() {
    // Update a register
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found'});
    }

    await UserRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new UserController();
