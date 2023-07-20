const router = require('express').Router();
const User = require('../models/user.model');
const UserStats = require('../models/userStats.model');
const UserProfile = require('../models/userProfile.model');

// Route to fetch user by ID
router.route('/user/:userId').get((req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to fetch userStats by userID
router.route('/userStats/:userId').get((req, res) => {
  const userId = req.params.userId;

  UserStats.findOne({ userId })
    .then(userStats => {
      if (!userStats) {
        return res.status(404).json({ message: 'User stats not found' });
      }

      res.json(userStats);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userProfile/:userID').get((req, res) => {
  const userId = req.params.userID;

  UserProfile.findOne({userId})
    .then(userProfile => {
      if(!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });        
      }

      res.json(userProfile);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/userStats/:userId').put((req, res) => {
  const userId = req.params.userId;
  const { level, time } = req.body; // New level properties received in the request body

  UserStats.findOne({ userId })
    .then(userStats => {
      if (!userStats) {
        return res.status(404).json({ message: 'User stats not found' });
      }

      const levels = userStats.levels;

      // Check if any level matches the new level number
      const existingLevel = levels.find(l => l.level === level);
      if (existingLevel) {
        // Replace the existing level's time with the new level's time
        existingLevel.time = time;
      } else {
        // Push a new level only if no level with the same level number exists
        levels.push({ level, time });
      }

      // Remove duplicate level entries with the same level number
      const uniqueLevels = levels.reduce((acc, curr) => {
        const found = acc.find(l => l.level === curr.level);
        if (!found) {
          acc.push(curr);
        }
        return acc;
      }, []);

      // Update the userStats levels array with unique level entries
      userStats.levels = uniqueLevels;

      userStats.save()
        .then(updatedUserStats => {
          res.json(updatedUserStats);
        })
        .catch(err => res.status(400).json('Error updating user stats: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userProfile/:userId/coins').put((req, res) => {
  const userId = req.params.userId;
  const coinsAmount = req.body.coinsAmount;

  UserProfile.findOne({ userId })
    .then(userProfile => {
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      // Update the coins amount
      userProfile.coins += coinsAmount;

      userProfile.save()
        .then(updatedUserProfile => {
          res.json(updatedUserProfile);
        })
        .catch(err => res.status(400).json('Error updating user profile: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userProfile/:userId/skins').put((req, res) => {
  const userId = req.params.userId;
  const newSkin = req.body.newSkin;

  UserProfile.findOne({ userId })
    .then(userProfile => {
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      console.log("fjdsklfjsldkf");
      // Check if the new skin already exists in the skins array
      const existingSkin = userProfile.skins.find(skin => skin.name === newSkin.name);
      if (existingSkin) {
        console.log('Error: Skin with the same name already exists');
        return res.status(400).json({ message: 'Skin with the same name already exists' });
      }

      // Add the new skin to the skins array
      userProfile.skins.push(newSkin);

      userProfile.save()
        .then(updatedUserProfile => {
          res.json(updatedUserProfile);
        })
        .catch(err => res.status(400).json('Error updating user profile: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userProfile/:userId/equiptSkin').put((req, res) => {
  const userId = req.params.userId;
  const newEquiptSkin = req.body.newSkin;

  UserProfile.findOne({userId})
    .then(userProfile => {
      if(!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      userProfile.equiptSkin = newEquiptSkin;

      userProfile.save()
        .then(updatedUserProfile => {
          res.json(updatedUserProfile);
        })
        .catch(err => res.status(400).json('Error updating user profile: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/userStatsAll').get((req, res) => {
  UserStats.find()
    .then(userStats => {
      if(!userStats) {
        return res.status(404).json({ message: 'User stats not found' });        
      }
      const levelItems = userStats.map(stats => stats.levels);
      res.json(userStats);
    })
    .catch(error => {
      console.error('Error retrieving user stats:', error);
    });
})

router.route('/userStatsWPM/:userId').put((req, res) => {
  const userId = req.params.userId;
  const wpm = req.body.wpm;

  UserStats.findOne({userId})
    .then(userStats => {
      if (!userStats) {
        return res.status(404).json({ message: 'User stats not found' });
      }

      userStats.topWPM = wpm;
      
      userStats.save()
        .then(updatedUserStats => {
          res.json(updatedUserStats);
        })
        .catch(err => res.status(400).json('Error updating user stats: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;