import EventService from "../services/event.services.js";

class EventController {
  static async createEvent(req, res) {
    try {
      const { session_id, event_type, timestamp, page_url, x, y } = req.body;
      const payload = {};
      if (x && y) {
        payload.x = x;
        payload.y = y;
      }
      await EventService.createEvent({
        session_id,
        event_type,
        timestamp,
        page_url,
        ...payload,
      });
      res.status(201).send("Event created");
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  }

  static async getEventsBySession(req, res) {
    try {
      const { id } = req.params;
      const events = await EventService.getAllEventsBySession(id);
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events by session:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  }

  static async getClickHeatmapData(req, res) {
    try {
      const { pageUrl } = req.query;
      const heatmapData =
        await EventService.getClickHeatmapDataForPage(pageUrl);
      res.status(200).json(heatmapData);
    } catch (error) {
      console.error("Error fetching click heatmap data:", error);
      res.status(500).json({ error: "Failed to fetch click heatmap data" });
    }
  }

  static async getAllSessions(req, res) {
    try {
      const sessions = await EventService.getAllSessions();
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error fetching all sessions:", error);
      res.status(500).json({ error: "Failed to fetch all sessions" });
    }
  }
}

export default EventController;
