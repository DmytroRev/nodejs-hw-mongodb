import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import crypto from 'node:crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUser = async (userReg) => {
  const user = await UsersCollection.findOne({ email: userReg.email });
  if (user !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(userReg.password, 10);
  return await UsersCollection.create({
    ...userReg,
    password: encryptedPassword,
  });
};

export const loginUser = async (userLog) => {
  const user = await UsersCollection.findOne({ email: userLog.email });

  if (user === null) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(userLog.password, user.password);

  if (!isEqual) throw createHttpError(401, 'Unauthorized');
  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await UsersCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: session._id });

  return SessionCollection.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
