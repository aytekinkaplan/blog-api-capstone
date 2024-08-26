module.exports = async function () {
  // Gerekli modülleri yükleyin
  const User = require("../models/userModel");
  const Token = require("../models/tokenModel");
  const Comment = require("../models/commentModel");
  const Category = require("../models/categoryModel");
  const Blog = require("../models/blogModel");

  // Mevcut veritabanını temizleyin
  await User.deleteMany();
  await Token.deleteMany();
  await Comment.deleteMany();
  await Category.deleteMany();
  await Blog.deleteMany();

  // Kullanıcıları oluşturun
  const adminUser = await User.create({
    username: "admin",
    password: "aA?123456",
    email: "admin@site.com",
    firstName: "admin",
    lastName: "admin",
    isActive: true,
    isStaff: true,
    isAdmin: true,
  });

  const staffUser = await User.create({
    username: "staff",
    password: "aA?123456",
    email: "staff@site.com",
    firstName: "staff",
    lastName: "staff",
    isActive: true,
    isStaff: true,
    isAdmin: false,
  });

  const testUser = await User.create({
    username: "test",
    password: "aA?123456",
    email: "test@site.com",
    firstName: "test",
    lastName: "test",
    isActive: true,
    isStaff: false,
    isAdmin: false,
  });

  // Kategori oluşturun
  const category = await Category.create({
    name: "General",
  });

  // Blog oluşturun
  const blog = await Blog.create({
    userId: adminUser._id,
    categoryId: category._id,
    title: "First Blog Post",
    content: "This is the content of the first blog post.",
    isPublish: true,
    likes: 10,
    countOfVisitors: 100,
  });

  // Yorum oluşturun
  await Comment.create({
    userId: testUser._id,
    blogId: blog._id,
    comment: "Great post!",
  });

  // Token oluşturun (örnek olarak)
  await Token.create({
    userId: adminUser._id,
    token: "...tokenKey...",
  });

  console.log("* Data Synced * ");
};
