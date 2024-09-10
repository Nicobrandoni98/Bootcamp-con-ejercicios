const dummy = (blogs) => {
  return (blogs = 1);
};

const totalLikes = (blog) => {
  const likes = blog.reduce((sum, blog) => sum + blog.likes, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    return blogs.reduce((max, blog) => {
      return (blog.likes > max.likes) ? blog : max;
    }, blogs[0]);
  };

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
