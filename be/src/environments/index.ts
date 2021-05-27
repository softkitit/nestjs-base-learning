import * as dotenv from 'dotenv';

dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
const AUTHOR: string = process.env.AUTHOR || 'Vitalii Samofal';

// application
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 14047;
const END_POINT: string = process.env.END_POINT || '';
const VOYAGER: string = process.env.VOYAGER || 'voyager';
const FE_URL: string = process.env.FE_URL || 'http://localhost:4200';
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;

// static
const STATIC: string = process.env.STATIC || 'static';

// mongodb
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST || `localhost`;
const MONGO_PORT = +process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || 'study_project';
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb://${MONGO_HOST}/${MONGO_DB}`;

// jsonwebtoken
const ISSUER: string = process.env.ISSUER || 'Softkit';
const AUDIENCE: string = process.env.AUDIENCE || 'https://softkitit.com';
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'auth';
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token';
const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key';
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token';
const EMAIL_TOKEN_SECRET: string =
  process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
const RESETPASS_TOKEN: string =
  process.env.RESETPASS_TOKEN || 'resetpass-token';
const RESETPASS_TOKEN_SECRET: string =
  process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

// nodemailer
const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'xxx';
const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'xxx';

// cloudinary
const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME || 'chnirt';
const CLOUDINARY_API_KEY: string =
  process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || '';

// pubsub
const NOTIFICATION_SUBSCRIPTION: string = 'newNotification';
const USER_SUBSCRIPTION: string = 'newUser';
const MESSAGES_SUBSCRIPTION: string = 'newMessages';

// stripe
const STRIPE_PUBLIC_KEY: string = process.env.STRIPE_PUBLIC_KEY || 'xxx';
const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || 'xxx';
const STRIPE_PLAN: string = process.env.STRIPE_PLAN || 'xxx';

export {
  NODE_ENV,
  AUTHOR,
  PRIMARY_COLOR,
  DOMAIN,
  PORT,
  END_POINT,
  VOYAGER,
  FE_URL,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
  STATIC,
  MONGO_URL,
  MONGO_PORT,
  MONGO_DB,
  ISSUER,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SECRET,
  RESETPASS_TOKEN,
  RESETPASS_TOKEN_SECRET,
  EMAIL_TOKEN,
  EMAIL_TOKEN_SECRET,
  BCRYPT_SALT,
  NODEMAILER_USER,
  NODEMAILER_PASS,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  USER_SUBSCRIPTION,
  NOTIFICATION_SUBSCRIPTION,
  MESSAGES_SUBSCRIPTION,
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_PLAN,
  AUDIENCE,
};
