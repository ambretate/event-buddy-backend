import { Router } from "express";
import userRoutes from "./users.js";
// import eventRoutes from "./events.js";

const router = Router();

router.get("/", (request, response) =>
  response.send("Welcome to the EventBuddy API route")
);

router.use("/users", userRoutes);
// router.use("/events", eventRoutes);

export default router;
