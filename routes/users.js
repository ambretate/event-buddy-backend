import { Router } from "express";
import * as controllers from "../controllers/users.js";

const router = Router();

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);

router.get("/saved-events", controllers.getSavedEvents);
router.put("/saved-event/:eventId", controllers.updateSavedEvents);
router.delete("/saved-event/:eventId", controllers.deleteSavedEvents);

router.put("/update-user", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;
