// Run: node populatedb.js <MONGO_DB_URI>

console.log('Populating DB');

const async = require('async');
const mongoose = require('mongoose');
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const InitiateMongoServer = require('./config/db');
const User = require('./models/user');
// const Thot = require('./models/thot');

const userArgs = process.argv.slice(2);

if (!userArgs.length || !userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: Specify a valid mongodb URL as the first argument');
  return;
}

const mongoUri = userArgs[0];
InitiateMongoServer(mongoUri);

const allUsers = [];
const allThots = [];

// const thot1 = {
//   title: 'Risk & Humor',
//   body: `I can be an overachiever. It doesn't have to suck though. Take breaks, bring a little humor into it.<br><br>My costar today read: <br>"If you want to develop your abilities to take risks, have a sense of humor about larger truths. If you adjust your thinking, anything can be a mirror."<br><br>This made me think - I can take on many projects, it can be a risky thing (overworking myself to death & the possibility of going completely insane) - but with today's costar reading, it made me see the struggle of too much work as a joke. I thought, "DAMN I got so much fucking work to do! But I making dat moneeeyyyy. I'm getting closer to my goals at light speed!"<br><br>Instantly, my mood changed. It became less daunting to get back to work. My mind became less clustered with the things I needed to get done. I was able to see that, although I have a lot on my plate, I shouldn't have to thinkg about EVERYTHING I need to do. I need to formulate a good step by step plan and just focus on the one thing at the top of the list. I really was making myself go crazy, thinking and worrying about other things while working on one thing, making it hard to finish the current task at hand - also making me super super depressed working.<br><br>No more. I am taking things slow, giving myself breaks, and living my goddamn life again! Cooking for myself & the roomies, music, reading, meditating...<br><br>I'm back.`,
//   username: user1.username
// }

// const thot2 = {
//   title: `Testing`,
//   body: `this is a test`,
//   username: randomstring.generate(15)
// }

const generateRandomUsername = () => {
  return 'user_' + randomstring.generate(15);
}

const userCreate = async ({ email, password, username }, cb) => {
  try {
    let foundUser = await User.findOne({ username });
    if (foundUser) username = generateRandomUsername();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash, username });
    console.log('New User', user);
    allUsers.push(user);
    cb(null, user);

  } catch (e) {
    console.error(e);
    cb(e, null);
  }
}

// const thotCreate = async ({title, body, userId}, cb) => {
//   try {
//     const thot = new Thot({ title, body, userId });
//     thot.save();
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

const createUsers = (cb) => {
  async.series([ // need to use series b/c pushing in Users array in order of new User creation.
    function (callback) {
      const email = 'theanonymousthots@gmail.com';
      const password = '12345678';
      userCreate({ email, password, username: generateRandomUsername() }, callback);
    },
    function (callback) {
      const email = 'janedoe@email.com';
      const password = '123456789';
      userCreate({ email, password, username: generateRandomUsername() }, callback);
    },
    function (callback) {
      const email = 'anotheremail@gmail.com';
      const password = '1234567890';
      userCreate({ email, password, username: 'user_u45UjSxCqt0b5Tl' }, callback);
    }
  ],
  // optional callback
  cb);
}

const createThots = () => {
  async.parallel([

  ],
  // optional callback
  cb);
}

async.series([
  createUsers, // series
  // createThots, // parallel
], 
(e, res) => {
  if (e) {
    console.log('FINAL ERROR: ' + e);
  } else {
    console.log('else')
    console.log('USER INSTANCES: ' + allUsers);
    console.log('results', res)
  }

  // Async series complete, now disconnect from database
  mongoose.connection.close();
});
