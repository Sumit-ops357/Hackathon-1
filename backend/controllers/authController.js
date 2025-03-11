const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role, // "patient" or "doctor"
      phone,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });

  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};
