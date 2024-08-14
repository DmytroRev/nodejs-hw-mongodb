import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: '7a39cc001@smtp-brevo.com',
    pass: 'L5B4nTawJvp6btHZ',
  },
});

export const sendMail = (options) => {
  return transport.sendMail(options);
};
