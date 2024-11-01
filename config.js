require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    strictPopulate: false,
  },
};

module.exports = {
  dev_uri: process.env.DEV_URI || 'mongodb+srv//https://127.0.0.1:5000',
  dev_url: process.env.DEV_URL,
  dev_port: process.env.DEV_PORT,
  dev_secret: process.env.DEV_SECRET,
  origin_url: process.env.ORIGIN_URL,
  clientOptions,
  mongoose,
  express,
};
