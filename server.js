import db from "./db/connection.js";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import jwt from "express-jwt";

const app = express();
const PORT = process.env.PORT || 3017;
const allowedOrigins = ['https://main--eventb.netlify.app'];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logger("dev"));

// const jwtMiddleware = jwt({
//   secret: process.env.JWT_SECRET, 
//   algorithms: ['HS256']
// }).unless({ path: ['/api/users/sign-up', '/api/users/sign-in'] }); // Public routes

// app.use(jwtMiddleware);

app.use("/api", routes);

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));

  app.listen(PORT, () => {
    console.log(chalk.magenta(`Express server running on port ${PORT}`));
  });
});

// Error handler for JWT authentication errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  } else {
    next(err);
  }
});