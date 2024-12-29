const prisma = require('../config/db');

const saveRefreshToken = async (userId, token) => {
  return await prisma.refreshToken.create({
    data: {
      userId,
      token,
    },
  });
};

const findRefreshToken = async (token) => {
  return await prisma.refreshToken.findUnique({
    where: { token },
  });
};

const deleteRefreshToken = async (token) => {
  return await prisma.refreshToken.delete({
    where: { token },
  });
};

module.exports = { saveRefreshToken, findRefreshToken, deleteRefreshToken };