import db from "./db/connection.js";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3017;
const allowedOrigins = ['https://main--eventb.netlify.app/'];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logger("dev"));

app.use("/api", routes);

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));

  app.listen(PORT, () => {
    console.log(chalk.magenta(`Express server running on port ${PORT}`));
  });
});