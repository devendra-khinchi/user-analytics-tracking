import { useEffect, useMemo, useState } from "react";
import HeatmapPanel from "./components/HeatmapPanel";
import SessionPanel from "./components/SessionPanel";

const API_BASE = "/api";

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [sessionEvents, setSessionEvents] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sessions");
  const [selectedPageUrl, setSelectedPageUrl] = useState("");
  const [heatmapData, setHeatmapData] = useState([]);
  const [loadingHeatmap, setLoadingHeatmap] = useState(false);
  const [error, setError] = useState("");

  const pageOptions = useMemo(
    () => Array.from(new Set(sessionEvents.map((event) => event.page_url))).sort(),
    [sessionEvents]
  );

  useEffect(() => {
    const loadSessions = async () => {
      setLoadingSessions(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE}/sessions`);
        const data = await response.json();
        setSessions(data || []);
      } catch (err) {
        setError("Unable to load sessions.");
      } finally {
        setLoadingSessions(false);
      }
    };

    loadSessions();
  }, []);

  useEffect(() => {
    if (!selectedSessionId) {
      setSessionEvents([]);
      return;
    }

    const loadSessionEvents = async () => {
      setLoadingEvents(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE}/sessions/${selectedSessionId}`);
        const data = await response.json();
        setSessionEvents(
          (data || []).sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          )
        );
      } catch (err) {
        setError("Unable to load session events.");
      } finally {
        setLoadingEvents(false);
      }
    };

    loadSessionEvents();
  }, [selectedSessionId]);

  useEffect(() => {
    if (!selectedPageUrl) {
      setHeatmapData([]);
      return;
    }

    const loadHeatmap = async () => {
      setLoadingHeatmap(true);
      setError("");
      try {
        const response = await fetch(
          `${API_BASE}/heatmap?pageUrl=${encodeURIComponent(selectedPageUrl)}`
        );
        const data = await response.json();
        setHeatmapData(
          (data || []).filter((item) => item.x != null && item.y != null)
        );
      } catch (err) {
        setError("Unable to load heatmap data.");
      } finally {
        setLoadingHeatmap(false);
      }
    };

    loadHeatmap();
  }, [selectedPageUrl]);

  useEffect(() => {
    if (!selectedPageUrl && pageOptions.length > 0) {
      setSelectedPageUrl(pageOptions[0]);
    }
  }, [pageOptions, selectedPageUrl]);

  const selectedSession = sessions.find((session) => session._id === selectedSessionId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400/80">
              Event tracking dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Sessions & heatmap overview
            </h1>
            <p className="max-w-2xl text-slate-400 sm:text-base">
              Browse tracked sessions, review ordered events by user journey, and visualize click positions on page URLs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedTab === "sessions"
                  ? "bg-sky-400 text-slate-950"
                  : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
              onClick={() => setSelectedTab("sessions")}
            >
              Sessions View
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedTab === "heatmap"
                  ? "bg-sky-400 text-slate-950"
                  : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
              onClick={() => setSelectedTab("heatmap")}
            >
              Heatmap View
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                Sessions
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {sessions.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Total tracked sessions. Select a session to inspect the ordered event journey.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                Active session
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {selectedSession ? selectedSession._id : "No session selected"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {selectedSession
                  ? `${selectedSession.totalEvents} total events` 
                  : "Choose a session from the list to view the full user journey."}
              </p>
            </div>
          </aside>

          <main className="space-y-6">
            {selectedTab === "sessions" ? (
              <SessionPanel
                sessions={sessions}
                selectedSessionId={selectedSessionId}
                onSessionClick={setSelectedSessionId}
                sessionEvents={sessionEvents}
                loadingSessions={loadingSessions}
                loadingEvents={loadingEvents}
              />
            ) : (
              <HeatmapPanel
                pageOptions={pageOptions}
                selectedPageUrl={selectedPageUrl}
                onPageUrlChange={setSelectedPageUrl}
                heatmapData={heatmapData}
                loadingHeatmap={loadingHeatmap}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
