const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('GET => some blogs are saved', () => {
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
});

describe('POST => posting blogs', () => {
  test('A blog can ba added', async () => {
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
});

describe('PUT => updating a blog post', () => {
  test('A blog post can be updated', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[1];

    const forUpdate = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 100,
    };

    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(forUpdate).expect(200);
    expect(updatedBlog.body).toHaveProperty('likes', 100);
  });
});

describe('DELETE => deleting blogs', () => {
  test('A blog can be deleted', async () => {
    const blogAtStart = await helper.blogsInDB();

    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const check = blogsAtEnd.map(b => b.titles);
    expect(check).not.toContain('React patterns');
  });

  test('Deletion fails if blog was already deleted', async () => {
    const noBlog = await helper.nonExistingBlog();
    await api.delete(`/api/blogs/${noBlog}`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
