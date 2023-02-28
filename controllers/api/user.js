const express = require('express');
const { User } = require('../../models');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    // console.log("from post/login");
    try {
      const userData = await User.findOne({ 
        where: { 
          email: req.body.email, 
        } 
      });
// console.log(userData.id + " *****  " + userData.email);

      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
// console.log(userData.id + " ////*****  " + userData.email);

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
// console.log(userData.id + " ////  " + userData.email);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.email = userData.email;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: "You are now logged in!" });
      });
  
    } catch (err) {
        console.error(err)
      res.status(400).json(err);
    }
  });
  
  //Logout
  router.post('/logout', (req, res) => {
    console.log("from post/logout");
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  // CREATE new user
router.post('/signup', async (req, res) => {
  // console.log("from post/new user");
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
     console.log("the new email " + req.body.email);
    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;