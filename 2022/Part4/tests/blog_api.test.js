const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObj = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObj.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('Blogs returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('Unique identifier property of the blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs');

  const content = response.body.map(b => b.id);
  expect(content).toBeDefined();
});

test('HTTP POST => a blog can ba added', async () => {
  const newBlog = helper.aNewBlog;
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(b => b.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain("You Don't Know JS: Async & Performance");
});

test('If the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = helper.newBlogWithNoLikes;

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(b => b.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('If no likes');
  expect(response.body[6]).toHaveProperty('likes', 0);
});

test('A blog with no title and url is not added', async () => {
  const newBlog = helper.noTitleAndUrl;

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
