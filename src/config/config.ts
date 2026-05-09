import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  loginEmail: process.env.LOGIN_EMAIL || 'test@example.com',
  loginPassword: process.env.LOGIN_PASSWORD || 'password123',
  signupName: process.env.SIGNUP_NAME || 'Test User',
  signupEmail: process.env.SIGNUP_EMAIL || 'testuser@example.com',
};
