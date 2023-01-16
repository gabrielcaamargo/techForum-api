import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';
class UserController {
  async index(request: Request, response: Response) {
    // List all registers
    const { orderBy } = request.query;
    const users = await UserRepository.findAll(orderBy);

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
    const { username, followers } = request.body;

    const userExists = await UserRepository.findByUsername(username);

    if(!username) {
      return response.status(400).json({ error: 'Userame is required'});
    }

    if(userExists) {
      return response.status(400).json({ error: 'This username has already been taken'});
    }

    const user = await UserRepository.create({
      username, followers
    });

    response.json(user);
  }

  async update(request: Request, response: Response) {
    // Update a register
    const { id } = request.params;
    const { username, followers } = request.body;
    const userExists: any = await UserRepository.findById(id);
    const userByUsername: any = await UserRepository.findByUsername(username);

    if(!userExists) {
      return response.status(404).json({ error: 'User not found'});
    }

    if(!username) {
      return response.status(400).json({ error: 'Userame is required'});
    }

    if(userByUsername && userExists.id !== id) {
      return response.status(400).json({ error: 'This username has already been taken'});
    }

    const user = await UserRepository.update(id, {
      username, followers
    });

    response.json(user);
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
