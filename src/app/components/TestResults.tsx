"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Gauge,
  ListChecks,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "./LoadingSpinner";

type ViewRange = "day" | "week" | "month";

interface TestRun {
  test_name?: string;
  testName?: string;
  outcome: "Passed" | "Failed" | string;
  start_time?: string;
  end_time?: string;
}

interface FileItem {
  name: string;
  download_url: string;
}

/* ---------- Helpers ---------- */
const formatKeyDate = (date: Date) => date.toLocaleDateString("en-CA");

const toWeekKey = (yyyyMmDd: string) => {
  const d = new Date(yyyyMmDd);
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() - d.getDay());
  return formatKeyDate(weekStart);
};

const toMonthKey = (yyyyMmDd: string) => {
  const d = new Date(yyyyMmDd);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
};

const formatDisplayDate = (date: string, mode: ViewRange) => {
  if (!date) return "";
  const d = new Date(date);
  if (mode === "day") return d.toLocaleDateString("en-GB");
  if (mode === "week") return `Week of ${d.toLocaleDateString("en-GB")}`;
  if (mode === "month")
    return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return d.toLocaleDateString("en-GB");
};

const formatDateTime = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/* ---------- Main ---------- */
export default function TestResults() {
  const [dailyResults, setDailyResults] = useState<
    { date: string; tests: TestRun[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewRange>("day");
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const pageSize = 10;
  const minDate = new Date("2025-09-22");
  const maxDate = new Date();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/testResults");
        const files: FileItem[] = await res.json();
        if (!Array.isArray(files) || files.length === 0) {
          setDailyResults([]);
          return;
        }

        const byDay: Record<string, FileItem[]> = {};
        for (const f of files) {
          const day = f.name.split("-").slice(0, 3).join("-");
          byDay[day] = byDay[day] ? [...byDay[day], f] : [f];
        }

        const latestPerDay: { date: string; tests: TestRun[] }[] = [];
        for (const [day, list] of Object.entries(byDay)) {
          const latest = [...list]
            .sort((a, b) => a.name.localeCompare(b.name))
            .pop()!;
          const jsonRes = await fetch(latest.download_url);
          if (!jsonRes.ok) continue;
          const data = await jsonRes.json();
          const tests: TestRun[] = Array.isArray(data.test_runs)
            ? data.test_runs
            : Array.isArray(data.results)
            ? data.results
            : [];
          latestPerDay.push({ date: day, tests });
        }

        latestPerDay.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setDailyResults(latestPerDay);
        if (latestPerDay.length)
          setSelectedBucket(latestPerDay.at(-1)!.date);
      } catch (e) {
        console.error(e);
        setDailyResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const buckets = useMemo(() => {
    if (view === "day") return dailyResults;
    const bucketed: Record<string, TestRun[]> = {};
    for (const { date, tests } of dailyResults) {
      const key =
        view === "week"
          ? toWeekKey(`${date}T00:00:00`)
          : toMonthKey(`${date}T00:00:00`);
      bucketed[key] = bucketed[key]
        ? bucketed[key].concat(tests)
        : [...tests];
    }
    return Object.entries(bucketed)
      .map(([date, tests]) => ({ date, tests }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [dailyResults, view]);

  useEffect(() => {
    if (selectedDate) {
      const key =
        view === "day"
          ? formatKeyDate(selectedDate)
          : view === "week"
          ? toWeekKey(formatKeyDate(selectedDate))
          : toMonthKey(formatKeyDate(selectedDate));
      setSelectedBucket(key);
      setPage(1);
    }
  }, [selectedDate, view]);

  const selectedTests =
    buckets.find((b) => b.date === selectedBucket)?.tests ??
    buckets.at(-1)?.tests ??
    [];

  const summary = useMemo(() => {
    const all = buckets.flatMap((b) => b.tests);
    const passed = all.filter((t) => t.outcome === "Passed").length;
    const failed = all.filter((t) => t.outcome === "Failed").length;
    const other = all.length - passed - failed;
    const total = passed + failed + other;
    const passRate = total ? Math.round((passed / total) * 100) : 0;
    return { passed, failed, other, total, passRate };
  }, [buckets]);

  const histogramData = useMemo(
    () =>
      buckets.map(({ date, tests }) => {
        const p = tests.filter((t) => t.outcome === "Passed").length;
        const f = tests.filter((t) => t.outcome === "Failed").length;
        return {
          dateLabel: formatDisplayDate(date, view),
          passed: p,
          failed: f,
          total: tests.length,
        };
      }),
    [buckets, view]
  );

  const COLORS = ["#16a34a", "#dc2626", "#6b7280"];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!buckets.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <Card title="Automation Results">
          <p className="text-slate-500">No test results available yet.</p>
        </Card>
      </div>
    );
  }

  const totalPages = Math.ceil(selectedTests.length / pageSize);
  const pageTests = selectedTests.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 space-y-10">
      {/* Sticky Filters */}
      <div
        className={`sticky top-[55px] z-30 bg-white border-b border-slate-200 
        px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 
        transition-shadow duration-300 rounded-b-xl
        ${scrolled ? "shadow-sm" : ""}`}
      >
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* View buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <Activity size={16} /> View
            </span>
            <div className="flex rounded-lg border border-slate-300 overflow-hidden">
              {(["day", "week", "month"] as ViewRange[]).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setView(v);
                    setSelectedBucket(null);
                    setSelectedDate(null);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 text-sm transition ${
                    view === v
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <CalendarIcon size={16} /> Date
            </span>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat={view === "month" ? "MM/yyyy" : "dd/MM/yyyy"}
              showMonthYearPicker={view === "month"}
              placeholderText={
                view === "month" ? "Pick a month" : "Pick a date"
              }
              className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GitHub button */}
        <a
          href="https://github.com/Erlinguss/portfolio-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white 
            text-slate-800 font-medium flex items-center gap-2 shadow-sm 
            hover:bg-slate-50 transition w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 .9 2 .9 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.5-.3-5.1-1.3-5.1-5.7 0-1.2.4-2.2 1-3-.1-.3-.4-1.5.1-3 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.5.2 2.7.1 3 .7.8 1 1.8 1 3 0 4.4-2.6 5.3-5.1 5.6.4.3.8 1 .8 2.1v3.1c0 .4.2.7.8.6 4.7-1.5 8-5.8 8-10.9C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          View Code
        </a>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KpiCard label="Pass Rate" value={`${summary.passRate}%`} emphasis icon={<Gauge />} />
        <KpiCard label="Total Executions" value={summary.total.toString()} icon={<ListChecks />} />
        <KpiCard label="Passed" value={summary.passed.toString()} positive icon={<CheckCircle2 />} />
        <KpiCard label="Failed" value={summary.failed.toString()} negative icon={<XCircle />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Test Volume & Status">
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="passed" stackId="a" fill="#16a34a" />
                <Bar dataKey="failed" stackId="a" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Outcome Distribution">
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "Passed", value: summary.passed },
                    { name: "Failed", value: summary.failed },
                    { name: "Other", value: summary.other },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={800}
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                  <Cell fill={COLORS[2]} />
                </Pie>

                {/* Custom Centered Label */}
                <text
                  x="50%"
                  y="43%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-3xl font-extrabold fill-slate-900"
                >
                  {summary.passRate}%
                </text>
                <text
                  x="50%"
                  y="47%"
                  dy="20"
                  textAnchor="middle"
                  className="text-sm fill-slate-500"
                >
                  Pass rate
                </text>

                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card title={formatDisplayDate(selectedBucket ?? buckets.at(-1)?.date ?? "", view)}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-100">
              <tr>
                <Th>Test Name</Th>
                <Th>Outcome</Th>
                <Th>Start</Th>
                <Th>End</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pageTests.map((t, i) => {
                const name = t.test_name || t.testName || "-";
                const cls =
                  t.outcome === "Passed"
                    ? "text-green-600 font-semibold"
                    : t.outcome === "Failed"
                    ? "text-red-600 font-semibold"
                    : "text-slate-600";
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <Td>{name}</Td>
                    <Td>
                      <span className={cls}>{t.outcome}</span>
                    </Td>
                    <Td>{formatDateTime(t.start_time)}</Td>
                    <Td>{formatDateTime(t.end_time)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 pt-4 text-sm text-slate-600">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 
                       hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 
                       hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </Card>
    </div>
  );
}

/* ---------- UI helpers ---------- */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="px-4 md:px-5 py-3 border-b border-slate-200">
        <h3 className="text-base md:text-lg font-semibold text-slate-900">
          {title}
        </h3>
      </header>
      <div className="p-4 md:p-5">{children}</div>
    </section>
  );
}

function KpiCard({
  label,
  value,
  positive,
  negative,
  emphasis,
  icon,
}: {
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
  emphasis?: boolean;
  icon?: React.ReactNode;
}) {
  const tone = emphasis
    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
    : "bg-white text-slate-900";
  const ring = emphasis ? "ring-0" : "ring-1 ring-slate-200";
  const valueColor = positive
    ? "text-green-600"
    : negative
    ? "text-red-600"
    : emphasis
    ? "text-white"
    : "text-slate-900";

  const iconColor = positive
    ? "text-green-500"
    : negative
    ? "text-red-500"
    : emphasis
    ? "text-white"
    : "text-slate-400";

  return (
    <div
      className={`rounded-xl ${tone} ${ring} shadow-sm p-4 flex flex-col items-start`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className={iconColor}>{icon}</span>}
        <p className={`text-2xl md:text-3xl font-bold ${valueColor}`}>
          {value}
        </p>
      </div>
      <p
        className={`text-xs md:text-sm ${
          emphasis ? "text-white/90" : "text-slate-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-700">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 md:px-4 py-2 text-slate-700">{children}</td>
  );
}

