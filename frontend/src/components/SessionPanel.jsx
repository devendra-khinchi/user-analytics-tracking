import React from "react";

export default function SessionPanel({
  sessions,
  selectedSessionId,
  onSessionClick,
  sessionEvents,
  loadingSessions,
  loadingEvents,
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Session list</h2>
            <p className="mt-2 text-sm text-slate-400">
              Click a session to inspect the ordered events that make up the
              user journey.
            </p>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            {sessions.length}
          </span>
        </div>

        <div className="mt-6 space-y-2 overflow-y-auto max-h-100 pr-2">
          {loadingSessions ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
              Loading sessions...
            </div>
          ) : sessions.length === 0 ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
              No sessions found.
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session._id}
                type="button"
                onClick={() => onSessionClick(session._id)}
                className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                  selectedSessionId === session._id
                    ? "border-sky-400 bg-slate-900 text-white shadow-sm shadow-sky-500/10"
                    : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{session._id}</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                    {session.totalEvents}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Total events</p>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Session details
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              The ordered event list displays the user journey for the selected
              session.
            </p>
          </div>
          {loadingEvents ? (
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              Loading
            </span>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          {selectedSessionId ? (
            loadingEvents ? (
              <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
                Loading session events...
              </div>
            ) : sessionEvents.length === 0 ? (
              <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
                No events recorded for this session.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                    Ordered events
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {sessionEvents.length}
                  </p>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-130 pr-2">
                  {sessionEvents.map((event, index) => (
                    <div
                      key={`${event._id || index}-${event.timestamp}`}
                      className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                          Step {index + 1}
                        </span>
                        <span className="text-sm text-slate-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-slate-300">
                          <span className="font-semibold text-white">
                            Event:
                          </span>{" "}
                          {event.event_type}
                        </p>
                        <p className="text-sm text-slate-300">
                          <span className="font-semibold text-white">
                            Page:
                          </span>{" "}
                          {event.page_url}
                        </p>
                        {event.x != null && event.y != null ? (
                          <p className="text-sm text-slate-300">
                            <span className="font-semibold text-white">
                              Position:
                            </span>{" "}
                            {event.x}, {event.y}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
              Select a session to review the ordered click and navigation
              journey.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
