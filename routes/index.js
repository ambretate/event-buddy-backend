import { Router } from "express";
import userRoutes from "./users.js";
// import eventRoutes from "./events.js";

const router = Router();

let server = app.listen(process.env.PORT);


router.get("/", (request, response) =>
  response.send("Welcome to the EventBuddy API route")
);

router.use("/users", userRoutes);
// router.use("/events", eventRoutes);

export default router;
