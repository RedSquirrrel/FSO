const dummy = blogs => {
  return (blogs = 1);
};

const totalLikes = blogs => {
  const total = (sum, item) => {
    if (item.length === 0) return 0;
    if (item.length === 1) return item.likes;

    return sum + item.likes;
  };

  return blogs.reduce(total, 0);
};

const favoriteBlog = blogs => {
  const getBlog = blogs.reduce(
    ({ sums, most }, { title, author, likes }) => {
      if (likes > most.likes) most = { title, author, likes };
      return { sums, most };
    },
    { sums: {}, most: { likes: 0 } }
  ).most;

  return getBlog;
};

const mostBlogs = blogs => {
  const allAuthors = blogs.map(a => a.author);

  const count = (countedAuthor, author) => {
    if (!countedAuthor[author]) {
      countedAuthor[author] = 1;
      return countedAuthor;
    }

    countedAuthor[author] += 1;
    return countedAuthor;
  };

  const totals = allAuthors.reduce(count, {});
  const keys = Object.keys(totals);
  const values = keys.map(names => totals[names]);
  const results = keys.filter(names => totals[names] === Math.max(...values));
  const maxResult = Math.max(...values);

  const newObj = {
    author: results.toString(),
    blogs: maxResult,
  };

  return newObj;
};

const mostLikes = blogs => {
  return blogs.reduce(
    ({ sums, most }, { likes, author }) => {
      sums[author] = likes = (sums[author] || 0) + likes;
      if (likes > most.likes) most = { author, likes };
      return { sums, most };
    },
    { sums: {}, most: { likes: 0 } }
  ).most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
