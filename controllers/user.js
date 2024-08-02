const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Enregistrement d'un nouvel utilisateur
exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Utilisez directement req.body sans déstructuration inutile
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'User created !' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Incorrect login/password pair' });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Incorrect login/password pair' });
          } else {
            const token = jwt.sign(
              { userId: user._id },
              process.env.RANDOM_TOKEN_SECRET,
              { expiresIn: '2h' }
            );
            res.status(200).json({
              userId: user.id,
              token: token,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
