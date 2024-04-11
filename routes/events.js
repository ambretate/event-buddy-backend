import { Router } from "express";
import * as controllers from "../controllers/events.js";

const router = Router();

router.get("/", controllers.getAll);
router.get("/category/featured", controllers.getFeatured);
router.get("/category/music", controllers.getMusic);
router.get("/category/sports", controllers.getSports);
router.get("/category/shows", controllers.getShows);
router.get("/search/city/:city", controllers.getByCity);
router.get("/search/event/:event", controllers.getByEvent);

export default router;