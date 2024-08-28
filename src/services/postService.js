"use strict";

/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

// Modelleri İçe Aktarma
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

/**
 * En son yayınlanan blog gönderilerini getirir.
 * @returns {Promise<Array>} - Yayınlanan son blog gönderilerini döner.
 */
const getRecentPosts = async () => {
  try {
    // Yayınlanan son 5 blog gönderisini getirin
    return await Blog.find({ isPublish: true })
      .sort({ createdAt: -1 })
      .limit(5);
  } catch (error) {
    throw new Error(`Error fetching recent posts: ${error.message}`);
  }
};

/**
 * Tüm yayınlanan blog gönderilerini getirir.
 * @returns {Promise<Array>} - Yayınlanan tüm blog gönderilerini döner.
 */
const getPosts = async () => {
  try {
    // Yayınlanan tüm blog gönderilerini tarihe göre azalan sırayla getir
    return await Blog.find({ isPublish: true }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
};

/**
 * Tüm yazarları getirir.
 * @returns {Promise<Array>} - Tüm yazarları döner.
 */
const getAuthors = async () => {
  try {
    // Yazar olan kullanıcıları getir
    return await User.find({ isAdmin: false, isStaff: true });
  } catch (error) {
    throw new Error(`Error fetching authors: ${error.message}`);
  }
};

/**
 * Tüm kategorileri getirir.
 * @returns {Promise<Array>} - Tüm kategorileri döner.
 */
const getCategories = async () => {
  try {
    // Tüm kategorileri getir
    return await Category.find({});
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

// Fonksiyonları dışa aktar
module.exports = {
  getRecentPosts,
  getPosts,
  getAuthors,
  getCategories,
};
