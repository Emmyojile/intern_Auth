import User from "../models/auth.js";
import jwt from "jsonwebtoken";

// Render the registration page
export const registerPage = async (req, res) => {
  return res.render('register', { msg: '' });
};

// Render the login page
export const loginPage = async (req, res) => {
  return res.render('login', { msg: '' });
};

// Render the dashboard page
export const dashboardPage = async (req, res) => {
  const token = req.cookies.token;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const username = payload.username.toString().toLocaleUpperCase();
  return res.render('dashboard', { msg: username, layout: '../views/layouts/dash' });
};

// Handle user registration
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).render('register', { msg: 'Please provide all required parameters' });
    }

    const user = await User.findOne({ email });

    if (user) {
      console.log('User already exists');
      return res.status(400).render('register', { msg: `A user with ${req.body.email} already exists` });
    }

    const newUser = await User.create({ ...req.body });

    const token = newUser.createJWT();
    res.cookie('token', token, { httpOnly: true, secure: true });

    return res.status(201).redirect('login');
  } catch (error) {
    console.log(error);
    return res.status(500).render('register', { msg: error.message });
  }
};

// Handle user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking for an already existing email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      return res.status(400).render('login', { msg: `A user with ${req.body.email} does not exist` });
    }

    // Checking for incorrect password
    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      console.log('Incorrect Password');
      return res.status(400).render('login', { msg: 'Incorrect Password' });
    }

    const token = user.createJWT();
    res.cookie('token', token, { httpOnly: true, secure: true });

    return res.status(200).redirect('dashboard');
  } catch (error) {
    console.log(error);
    return res.status(500).redirect('login', { msg: error.message });
  }
};
