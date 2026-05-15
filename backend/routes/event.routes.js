import { Router } from "express";
import EventController from "../controllers/event.controllers.js";

const router = Router();

router.post("/events", EventController.createEvent);
router.get("/sessions", EventController.getAllSessions);
router.get("/sessions/:id", EventController.getEventsBySession);
router.get("/heatmap", EventController.getClickHeatmapData);

export default router;
