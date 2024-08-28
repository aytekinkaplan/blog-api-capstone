"use strict";

const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

async function getRecentPosts() {
  try {
    const recentPosts = await Blog.find().sort({ createdAt: -1 }).limit(5);
    return recentPosts;
  } catch (error) {
    throw new Error("Error fetching recent posts: " + error.message);
  }
}

async function getPosts() {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
}

async function getAuthors() {
  try {
    const authors = await User.find();
    return authors;
  } catch (error) {
    throw new Error("Error fetching authors: " + error.message);
  }
}

async function getCategories() {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
}

async function getPostCount() {
  try {
    const count = await Blog.countDocuments();
    return count;
  } catch (error) {
    throw new Error("Error fetching post count: " + error.message);
  }
}

module.exports = {
  getRecentPosts,
  getPosts,
  getAuthors,
  getCategories,
  getPostCount,
};
