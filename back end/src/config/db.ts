import mysql from 'mysql2';
import express from 'express';
import dotenv from 'dotenv';

export const db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    console.log('MySQL Database connected!');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
