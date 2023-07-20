const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password })
        .then(user => {
            if (user) {
                const userId = user._id;
                //passes back user id as well
                res.json({login: 'Login successful', userId: userId });
            } else {
                res.json('Invalid username or password');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
//post request for logging users into website

module.exports = router;