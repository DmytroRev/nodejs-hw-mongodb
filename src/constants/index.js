export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ROLES = {
  AUTHOR: 'userId',
};

export const SMTP = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMPT_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PWD: process.env.SMTP_PWD,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};
