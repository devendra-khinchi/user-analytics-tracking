import React, { useMemo } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function HeatmapPanel({
  pageOptions,
  selectedPageUrl,
  onPageUrlChange,
  heatmapData,
  loadingHeatmap,
}) {
  const tooltipFormatter = (value) => [`${value}`, ""];

  const chartDomain = useMemo(() => {
    const xs = heatmapData.map((item) => Number(item.x) || 0);
    const ys = heatmapData.map((item) => Number(item.y) || 0);
    const maxX = Math.max(800, ...xs, 100);
    const maxY = Math.max(600, ...ys, 100);
    return {
      maxX: Math.ceil(maxX / 50) * 50,
      maxY: Math.ceil(maxY / 50) * 50,
    };
  }, [heatmapData]);

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const event = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-sm text-slate-100 shadow-xl shadow-slate-950/40">
        <p className="font-semibold text-white">Click details</p>
        <p className="mt-1 text-slate-400">X: {event.x}</p>
        <p className="text-slate-400">Y: {event.y}</p>
        <p className="text-slate-400">Session: {event.session_id}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Heatmap view</h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a page URL to visualize click positions as a scatter
              heatmap.
            </p>
          </div>
          <div className="flex-1">
            <label htmlFor="pageUrl" className="sr-only">
              Page URL
            </label>
            <input
              id="pageUrl"
              type="text"
              value={selectedPageUrl}
              onChange={(event) => onPageUrlChange(event.target.value)}
              list="page-url-options"
              placeholder="Enter or select a page URL"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
            <datalist id="page-url-options">
              {pageOptions.map((url) => (
                <option key={url} value={url} />
              ))}
            </datalist>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Click positions
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Visualizing each recorded click as a scatter point.
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-slate-300">
              {heatmapData.length}
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
            <div
              className="relative overflow-hidden rounded-3xl bg-slate-950/90 p-2"
              style={{ height: 420 }}
            >
              {loadingHeatmap ? (
                <div className="absolute inset-0 grid place-items-center text-slate-300">
                  Loading heatmap...
                </div>
              ) : heatmapData.length === 0 ? (
                <div className="absolute inset-0 grid place-items-center px-4 text-center text-slate-400">
                  Enter a page URL and load click positions to display the
                  heatmap.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
                  >
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="X"
                      domain={[0, chartDomain.maxX]}
                      tick={{ fill: "#94a3b8" }}
                      axisLine={{ stroke: "#475569" }}
                      tickLine={{ stroke: "#475569" }}
                      label={{
                        value: "X",
                        position: "insideBottom",
                        fill: "#94a3b8",
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Y"
                      domain={[chartDomain.maxY, 0]}
                      tick={{ fill: "#94a3b8" }}
                      axisLine={{ stroke: "#475569" }}
                      tickLine={{ stroke: "#475569" }}
                      label={{
                        value: "Y",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#94a3b8",
                      }}
                    />
                    <Tooltip
                      content={renderTooltip}
                      cursor={{ stroke: "#7dd3fc", strokeDasharray: "3 3" }}
                      formatter={tooltipFormatter}
                    />
                    <Scatter data={heatmapData} fill="#38bdf8" />
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Click events</h3>
          <p className="mt-2 text-sm text-slate-400">
            Each point represents a click captured for the selected page URL.
          </p>

          <div className="mt-5 max-h-130 overflow-y-auto space-y-3 pr-2">
            {loadingHeatmap ? (
              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-sm text-slate-400">
                Loading click events...
              </div>
            ) : heatmapData.length === 0 ? (
              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-sm text-slate-400">
                No click data available for this URL yet.
              </div>
            ) : (
              heatmapData.map((click, index) => (
                <div
                  key={`${click._id || index}-${click.x}-${click.y}`}
                  className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4"
                >
                  <div className="flex items-center justify-between gap-2 text-sm text-slate-300">
                    <span className="font-semibold text-white">
                      Click {index + 1}
                    </span>
                    <span>
                      {new Date(click.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {click.page_url}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Coordinates: {click.x}, {click.y}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Session: {click.session_id}
                  </p>
                </div>
              ))
            )}
          </div>
        </div> */}
      </section>
    </div>
  );
}
