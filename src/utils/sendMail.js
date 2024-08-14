import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transport = nodemailer.createTransport({
  host: SMTP.SMTP_HOST,
  port: SMTP.SMPT_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PWD,
  },
});

export const sendMail = (options) => {
  return transport.sendMail(options);
};
