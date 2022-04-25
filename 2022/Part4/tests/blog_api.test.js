const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

let token;
const password = 'titok';

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('titok', 10);
  const user = new User({ username: 'root', name: 'test', passwordHash });

  await user.save();

  const findUser = user.username;
  const user1 = await User.findOne({ findUser });
  await bcrypt.compare(password, user.passwordHash);

  const userForToken = {
    username: user1.username,
    id: user1._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);
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
  test('A blog can be added', async () => {
    const newBlog = helper.aNewBlog;

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(b => b.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("You Don't Know JS: Async & Performance");
  });

  test('A blog cannot be added if a token is not provided, fails with status code 401 Unauthorized', async () => {
    const newBlog = helper.aNewBlog;

    await api.post('/api/blogs').send(newBlog).expect(401);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(b => b.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
    expect(titles).not.toContain("You Don't Know JS: Async & Performance");
  });

  test('If the likes property is missing from the request, it will be "0" by default', async () => {
    const newBlog = helper.newBlogWithNoLikes;

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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

    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(400);

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
    const newBlog = helper.aNewBlog;
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    const blogToDelete = response.body[6].id;

    await api.delete(`/api/blogs/${blogToDelete}`).set('Authorization', `bearer ${token}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(response.body.length - 1);

    const check = blogsAtEnd.map(b => b.titles);
    expect(check).not.toContain("You Don't Know JS: Async & Performance");
  });

  test('Deletion fails if blog was already deleted', async () => {
    const noBlog = await helper.nonExistingBlog();
    await api.delete(`/api/blogs/${noBlog}`).set('Authorization', `bearer ${token}`).expect(404);
  });
});

describe('USERS', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('titok', 10);
    const user = new User({ username: 'Ada Lovelace', name: 'Ada King', passwordHash });

    await user.save();
  });

  test('users are not created if username is missing', async () => {
    const userAtStart = await helper.usersInDB();

    const newUser = {
      name: 'No name',
      password: 'missing',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error).toContain('Username is required!');
    const userAtEnd = await helper.usersInDB();
    expect(userAtEnd).toEqual(userAtStart);
  });

  test('users are not created if username is already taken', async () => {
    const userAtStart = await helper.usersInDB();

    const sameUsername = {
      username: 'Ada Lovelace',
      name: 'Same username',
      password: 'noChance',
    };

    const result = await api.post('/api/users').send(sameUsername).expect(400);

    expect(result.body.error).toContain('username must be unique');
    const userAtEnd = await helper.usersInDB();
    expect(userAtEnd).toEqual(userAtStart);
  });

  test('user is not created with a short username', async () => {
    const userAtStart = await helper.usersInDB();

    const shortUsername = {
      username: 'Wa',
      name: 'shorty',
      password: 'noChance',
    };

    const result = await api.post('/api/users').send(shortUsername).expect(400);
    expect(result.body.error).toContain('Username must be at least 3 characters long.');

    const userAtEnd = await helper.usersInDB();
    expect(userAtEnd).toEqual(userAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
