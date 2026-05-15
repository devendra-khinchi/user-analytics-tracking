import EventModel from "../models/event.models.js";

class EventService {
  static async createEvent(eventData) {
    await EventModel.create(eventData);
  }

  static async getAllSessions() {
    return await EventModel.aggregate([
      {
        $group: {
          _id: "$session_id",
          totalEvents: { $sum: 1 },
        },
      },
    ]);
  }

  static async getAllEventsBySession(session_id) {
    return await EventModel.find({ session_id });
  }

  static async getClickHeatmapDataForPage(page_url) {
    return await EventModel.find({ page_url, event_type: "click" });
  }
}

export default EventService;
