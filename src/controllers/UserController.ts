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

    if(!username) {
      return response.status(400).json({ error: 'Userame is required'});
    }

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

  async update(request: Request, response: Response) {
    // Update a register
    const { id } = request.params;
    const { username, followers, instagram } = request.body;

    const userExists: any = await UserRepository.findById(id);
    const userByUsername: any = await UserRepository.findByUsername(username);
    const userInstagramExists: any = await UserRepository.findByInstagram(instagram);

    if(!userExists) {
      return response.status(404).json({ error: 'User not found'});
    }

    if(!username) {
      return response.status(400).json({ error: 'Userame is required'});
    }

    if(!userInstagramExists) {
      return response.status(400).json({ error: 'Instagram is required'});
    }

    if(userByUsername && userExists.id !== id) {
      return response.status(400).json({ error: 'This username has already been taken'});
    }

    if(userInstagramExists && userExists.id !== id) {
      return response.status(400).json({ error: 'This instagram account has already been registered'});
    }

    const user = await UserRepository.update(id, {
      username, followers, instagram
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
