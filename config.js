require("dotenv").config();
const crossEnv = require("cross-env");
const express = require("express");

console.log("PROCCESS", process.env.DEV_URI);
console.log("PROCCESS", process.env.DEV_URL);
console.log("PROCCESS", process.env.DEV_PORT);

const mongoose = require("mongoose");

const clientOptions = {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      strictPopulate: false,
    },
  };

  module.exports = {
    dev_uri: process.env.DEV_URI,
    dev_url: process.env.DEV_URL,
    dev_port: process.env.DEV_PORT,
    dev_secret: process.env.DEV_SECRET,
    clientOptions,
    mongoose,
    express,
  }