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

module.exports = router;
