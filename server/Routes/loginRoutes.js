const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/usersModel");
const { getToken } = require("../Helpers/tokens");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Authentication Failed");
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = getToken({ userID: user._id.toString() });

      res
        .status(200)
        .header("Authorization", `Bearer ${token}`)
        .setHeader('Access-Control-Expose-Headers', 'Authorization')
        .json({
          thoughts: user.thoughts,
          email: user.email,
          displayName: user.displayName,
          fullName: user.fullName,
        });
    } else {
      throw new Error("Authentication Failed");
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
