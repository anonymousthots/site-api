// GET("/thots") => all thots
// GET("/thots?limit=50"): returns first 50 thots
// GET("/thots/:id") => returns thot instance
// POST("/thots/create") => new thot form (title, body fields)
// PATCH("/thots/:id") => edit thot (only if logged in)

const express = require('express');
const router = express.Router();
const Thot = require('../models/thot');

/**
 * @method - GET
 * @param - /thots
 * @description - Get all thots
 */

router.get('/', (req, res, next) => {
  Thot
    .find({})
    .limit(1)
    .exec(function(err, thots) {
      if (err) return next(err);
      res.status(200).json(thots);
    })
})

module.exports = router;