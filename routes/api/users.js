const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const router = express.Router();

//@route POST api/user
//@desc Register user
//access Public

router.post('/', async (req, res) => {
  const { username, email, password, phone, countrycode } = req.body;
  const avatarcolor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  try {
    // see if user exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    //Create User
    user = new User({
      username,
      email,
      password,
      phone,
      countrycode,
      avatarcolor,
    });

    //encrypt the password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    //return json webtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route    Get api/users/:user_id
// @desc     Get by id
// @access   Private

router.get(
  '/:user_id',
  // , auth
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
