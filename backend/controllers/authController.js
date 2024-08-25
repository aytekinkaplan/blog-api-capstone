"use strict";
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

exports.register = async (req, res) => {
  // Kayıt olma mantığı burada
};

exports.login = async (req, res) => {
  // Giriş yapma mantığı burada
};

exports.logout = async (req, res) => {
  // Çıkış yapma mantığı burada
};
