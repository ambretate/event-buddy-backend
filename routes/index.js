import { Router } from "express";
import userRoutes from "./users.js";

const router = Router();

router.get("/", (request, response) =>
  response.send("Welcome to the EventBuddy API route")
);

router.use("/users", userRoutes);

export default router;
