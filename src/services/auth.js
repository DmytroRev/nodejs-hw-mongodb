import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (userReg) => {
  const user = await UsersCollection.findOne({ email: userReg.email });
  if (user !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(userReg.password, 10);
  return await UsersCollection.create({
    ...userReg,
    password: encryptedPassword,
  });
};
