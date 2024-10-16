const config = require("../utils/config");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const token = request.token; // Se espera que esto ya esté en la solicitud
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // Verifica el token y extrae el usuario
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (error) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // Encuentra el usuario
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(404).json({ error: "user not found" });
  }

  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,  // Usar el ID del usuario encontrado
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token; 
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (error) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(404).json({ error: "user not found" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
