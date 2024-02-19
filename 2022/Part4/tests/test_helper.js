const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const aNewBlog = {
  title: "You Don't Know JS: Async & Performance",
  author: "Kyle Simpson",
  url: "https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md",
  likes: 7,
  // user: [],
};

const newBlogWithNoLikes = {
  title: "If no likes",
  author: "test",
  url: "https://google.com",
};

const noTitleAndUrl = {
  author: "Michael Chan",
  likes: 7,
};

const nonExistingBlog = async () => {
  const blog = new Blog({ title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const initialUser = {
  username: "root",
  name: "test",
  password: "secret",
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDB, newBlogWithNoLikes, noTitleAndUrl, aNewBlog, nonExistingBlog, usersInDB, initialUser };
