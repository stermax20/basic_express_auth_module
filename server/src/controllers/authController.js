const { createUser, findUserByUsername } = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const { saveRefreshToken, deleteRefreshToken, findRefreshToken } = require('../repositories/refreshTokenRepository');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    await createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await saveRefreshToken(user.id, refreshToken);

    res.json({
      message: 'Logged in successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.headers['authorization']?.split(' ')[1];
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

  try {
    const storedToken = await findRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = { id: decoded.id, username: decoded.username };
    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

module.exports = { register, login, refresh };