// GET("/users/:username") => returns user instance data

const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/:username', async (req, res, next) => {
  const username = req.params.username;

  User.find({ username })
    .exec(function(err, users) {
      if (err) return next(err);

      const data = users.map(({_id, email, username}) => {
        return { _id, email, username };
      })

      res.status(200).json(data);
    })
});

module.exports = router;