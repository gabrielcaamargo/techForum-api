import { Request, Response } from 'express';

import PostsRepository from '../repositories/PostsRepository';

class PostController {
  async index(request: Request, response: Response) {
    const posts = await PostsRepository.findAll();
    response.json(posts);
  }

  async store(request: Request, response: Response) {
    const { name, content, category, author, likes } = request.body;

    if(!name) {
      return response.status(400).json({ error: 'Name is required'});
    }

    if(!content) {
      return response.status(400).json({ error: 'Content is required'});
    }

    if(!category) {
      return response.status(400).json({ error: 'Category is required'});
    }

    if(!author) {
      return response.status(400).json({ error: 'Author is required'});
    }

    const post = await PostsRepository.create({ name, content, category, author, likes });
    response.json(post);
  }
}

export default new PostController();
