const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.status(200).json(blog);
  } else {
    response.status(404).json({ error: 'No blog exists with this id' });
  }
});

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ erorr: 'Token missing or invalid' });
  }

  const userFromDB = await User.findById(user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: userFromDB._id,
  });

  const result = await blog.save();
  userFromDB.blogs = userFromDB.blogs.concat(result._id);
  await userFromDB.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!blog) {
    return response.status(404).json({ error: 'No blog exists' });
  }

  if (blog.user.toString() === user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }
  return response.status(401).json({ error: 'Missing or invalid token' });
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: 'No blog exists with this id' });
  }
});

module.exports = blogsRouter;
