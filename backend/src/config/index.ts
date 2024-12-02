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
};
