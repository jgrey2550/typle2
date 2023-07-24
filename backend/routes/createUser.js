const router = require('express').Router();
let User = require('../models/user.model');
let UserStats = require('../models/userStats.model');
let UserProfile = require('../models/userProfile.model');
// const cors = require('cors')
// const express = require('express');

// const app = express();

// app.use(cors(
//     {
//         origin: ["https://typle2-frontend.vercel.app"],
//         methods: ["POST", "GET", "PUT"],
//         credentials: true
//     }
// ));
// app.use(express.json());

//post route for creating users
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({ username, password });

  console.log(newUser);

  newUser.save()
    .then((user) => {
      const userId = user._id; // Retrieve the userId after saving the user

      // Return the userId in the response
      res.json({ message: 'User added!', userId: userId });
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//post route for making stats object for each user
router.route('/addStats').post((req, res) => {
    const userId = req.body.userId;
    const levels = req.body.levels;
  
    const newUserStats = new UserStats({ userId, levels });
  
    // console.log(newUserStats);
  
    newUserStats.save()
      .then((user) => {
        res.json({ message: 'User stats added!'});
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/addProfile').post((req, res) => {
  const userId = req.body.userId;
  const coins = req.body.coins;
  const skins = req.body.skins;
  const equiptSkin = req.body.equiptSkin;

  const newUserProfile = new UserProfile({userId, coins, skins, equiptSkin});

  newUserProfile.save()
    .then((user) => {
      res.json({ message: 'User profile added!'});
    })
    .catch(err => res.status(400).json('Error: ' + err));    
})
  
module.exports = router;
