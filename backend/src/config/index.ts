import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 8000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  MONGODB_URL: process.env.MONGODB_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  CLIENT_URL: process.env.CLIENT_URL || '*',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD || '',
  OPENAI_GPT_MODEL: process.env.OPENAI_GPT_MODEL || 'gpt-3.5-turbo-0125',
  COPYESCAPE_API_USERNAME: process.env.COPYESCAPE_API_USERNAME || '',
  COPYESCAPE_API_KEY: process.env.COPYESCAPE_API_KEY || '',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || '',
  NVIDIA_NEMOTRON_API_KEY: process.env.NVIDIA_NEMOTRON_API_KEY || '',
  NVIDIA_NEMOTRON_BASE_URL: process.env.NVIDIA_NEMOTRON_BASE_URL || '',
};
