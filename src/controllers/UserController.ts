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

  async store(request: Request, response: Response) {
    // Create a register
    const { username, followers, instagram } = request.body;

    const userExists = await UserRepository.findByUsername(username);
    const userInstagramExists = await UserRepository.findByInstagram(instagram);

    if(userExists) {
      return response.status(400).json({ error: 'This username has already been taken'});
    }

    if(userInstagramExists) {
      return response.status(400).json({ error: 'This instagram account has already been registered'});
    }

    const user = await UserRepository.create({
      username, followers, instagram
    });

    response.json(user);
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
