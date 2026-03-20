import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Clock3,
  Target,
} from "lucide-react";

import HeaderPage from "@/components/HeaderPage";
import IDCardModal from "@/components/IDCardModal";
import { getDashboardData } from "@/lib/mockDashboardApi";

const meta = {
  title: "Monthly Clearance",
  subtitle: "Track your monthly attendance and clearance status.",
};

const notifications = [
  {
    id: 1,
    title: "ID card available",
    message: "You can now view and download your corps member ID card.",
    time: "just now",
    read: false,
  },
  {
    id: 2,
    title: "Biometric verification reminder",
    message:
      "Ensure you complete your biometric verification before the next clearance deadline.",
    time: "1h ago",
    read: false,
  },
  {
    id: 3,
    title: "Monthly clearance scheduled",
    message: "Your next LGA clearance is set for Monday, 04/03/2026.",
    time: "2h ago",
    read: false,
  },
  {
    id: 4,
    title: "PPA assignment confirmed",
    message:
      "Your Place of Primary Assignment (PPA) has been approved. Please report immediately.",
    time: "5d ago",
    read: false,
  },
];

const clearanceData = [
  { id: 1, month: "April 2025", status: "Present" },
  { id: 2, month: "May 2025", status: "Present" },
  { id: 3, month: "June 2025", status: "Present" },
  { id: 4, month: "July 2025", status: "Present" },
  { id: 5, month: "August 2025", status: "Present" },
  { id: 6, month: "September 2025", status: "Present" },
  { id: 7, month: "October 2025", status: "Present" },
  { id: 8, month: "November 2025", status: "Present" },
  { id: 9, month: "December 2025", status: "Present" },
  { id: 10, month: "January 2026", status: "Present" },
];

const nextClearanceDate = new Date("2026-03-04T09:00:00");

function getCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes, expired: false };
}

function getMonthGroups(data) {
  return [
    {
      year: "2025",
      items: data.filter((item) => item.month.includes("2025")),
    },
    {
      year: "2026",
      items: data.filter((item) => item.month.includes("2026")),
    },
  ].filter((group) => group.items.length > 0);
}

export default function LGAClearancePage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIDCard, setShowIDCard] = useState(false);
  const [search, setSearch] = useState("");
  const [countdown, setCountdown] = useState(getCountdown(nextClearanceDate));
  const [searchFocused, setSearchFocused] = useState(false);

  const { theme, resolvedTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === "light";

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardData();
      setDashboard(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(nextClearanceDate));
    }, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return clearanceData.filter((item) =>
      item.month.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const searchSuggestions = useMemo(() => {
    if (!search.trim()) return clearanceData.slice(0, 5);

    return clearanceData
      .filter((item) => item.month.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6);
  }, [search]);

  const monthGroups = useMemo(() => getMonthGroups(filtered), [filtered]);

  const completedCount = filtered.filter(
    (item) => item.status === "Present",
  ).length;
  const totalCount = filtered.length || 1;
  const progress = Math.round((completedCount / totalCount) * 100);

  if (loading || !dashboard) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`rounded-3xl border px-6 py-5 backdrop-blur-xl flex items-center gap-3 ${
            isLight
              ? "border-slate-200/70 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading LGA Clearance...</span>
        </motion.div>
      </div>
    );
  }

  const { user } = dashboard;

  return (
    <div
      className={`min-h-screen ${
        isLight
          ? "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),transparent_28%),linear-gradient(to_bottom_right,#f8fafc,#ffffff,#f1f5f9)]"
          : "bg-slate-950"
      }`}
    >
      <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-8 space-y-8">
        <HeaderPage
          user={user}
          meta={meta}
          notifications={notifications}
          onShowIDCard={() => setShowIDCard(true)}
        />

        <IDCardModal
          open={showIDCard}
          onClose={() => setShowIDCard(false)}
          user={user}
          isLight={isLight}
        />

        {/* TOP STRIP */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
          {/* HERO STATS + PROGRESS */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[28px] border p-4 sm:p-5 lg:p-6 ${
              isLight
                ? "border-slate-200/70 bg-white/72 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Clearance Rate",
                  value: "100%",
                  icon: TrendingUp,
                },
                {
                  title: "Attendance Streak",
                  value: "10 months",
                  icon: Sparkles,
                },
                {
                  title: "Last Clearance",
                  value: "Jan 2026",
                  icon: CalendarDays,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className={`rounded-[24px] border p-4 relative overflow-hidden ${
                    isLight
                      ? "border-slate-200/70 bg-white/80 shadow-[0_2px_14px_rgba(15,23,42,0.04)]"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                  <card.icon
                    className={`h-5 w-5 mb-3 ${
                      isLight ? "text-slate-500" : "text-white/70"
                    }`}
                  />
                  <p
                    className={`text-xs ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    {card.title}
                  </p>
                  <h2
                    className={`text-xl font-semibold tracking-tight ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {card.value}
                  </h2>
                </motion.div>
              ))}
            </div>

            {/* PROGRESS TRACKER */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    Clearance Progress
                  </p>
                  <p
                    className={`text-xs ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    {completedCount} of {filtered.length} records cleared
                  </p>
                </div>

                <div
                  className={`text-sm font-semibold ${
                    isLight ? "text-slate-800" : "text-white"
                  }`}
                >
                  {progress}%
                </div>
              </div>

              <div
                className={`h-3 rounded-full overflow-hidden ${
                  isLight ? "bg-slate-100" : "bg-white/10"
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filtered.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl px-3 py-2 text-xs border ${
                      isLight
                        ? "border-slate-200/70 bg-slate-50/90 text-slate-600"
                        : "border-white/10 bg-white/5 text-white/70"
                    }`}
                  >
                    {item.month}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* NEXT CLEARANCE COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileHover={{ y: -2 }}
            className={`rounded-[28px] border p-5 sm:p-6 relative overflow-hidden ${
              isLight
                ? "border-emerald-200/60 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(255,255,255,0.82))] shadow-[0_8px_30px_rgba(16,185,129,0.08)] backdrop-blur-xl"
                : "border-emerald-500/20 bg-emerald-500/10"
            }`}
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.18em] ${
                    isLight ? "text-emerald-700/70" : "text-emerald-300/70"
                  }`}
                >
                  Next Clearance
                </p>
                <h3
                  className={`mt-2 text-2xl font-semibold tracking-tight ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  04 Mar 2026
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isLight ? "text-slate-600" : "text-white/60"
                  }`}
                >
                  Scheduled clearance day at your LGA office
                </p>
              </div>

              <div
                className={`rounded-2xl p-3 border ${
                  isLight
                    ? "border-white/70 bg-white/70"
                    : "border-white/10 bg-black/20"
                }`}
              >
                <Clock3
                  className={`h-5 w-5 ${
                    isLight ? "text-emerald-700" : "text-emerald-300"
                  }`}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
              ].map((unit) => (
                <motion.div
                  key={unit.label}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl border px-4 py-4 text-center ${
                    isLight
                      ? "border-white/70 bg-white/70 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div
                    className={`text-2xl font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {unit.value}
                  </div>
                  <div
                    className={`text-[11px] mt-1 ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className={`mt-5 flex items-center gap-2 text-sm ${
                isLight ? "text-slate-700" : "text-white/70"
              }`}
            >
              <Target className="h-4 w-4" />
              Stay verified and attend on schedule
            </div>
          </motion.div>
        </div>

        {/* SEARCH */}
        <div className="sticky top-4 z-30">
          <div className="relative">
            <motion.div
              animate={{
                y: searchFocused ? -1 : 0,
              }}
              transition={{ duration: 0.18 }}
              className={`group flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-[24px] border transition-all duration-200 ${
                isLight
                  ? "bg-white/75 border-slate-200/70 shadow-[0_3px_18px_rgba(15,23,42,0.05)] backdrop-blur-xl focus-within:border-emerald-300/90 focus-within:shadow-[0_10px_30px_rgba(16,185,129,0.10)]"
                  : "bg-black/40 border-white/10"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                  isLight
                    ? "bg-slate-100 text-slate-500 group-focus-within:bg-emerald-50 group-focus-within:text-emerald-600"
                    : "bg-white/5 text-white/60"
                }`}
              >
                <Search className="h-4 w-4" />
              </div>

              <input
                placeholder="Search by month, for example January 2026"
                className={`w-full bg-transparent outline-none text-sm sm:text-[15px] ${
                  isLight
                    ? "text-slate-900 placeholder:text-slate-400"
                    : "text-white placeholder:text-white/35"
                }`}
                value={search}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => {
                  setTimeout(() => setSearchFocused(false), 120);
                }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div
                className={`hidden sm:flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${
                  isLight
                    ? "bg-slate-100 text-slate-500"
                    : "bg-white/5 text-white/45"
                }`}
              >
                <ArrowRight className="h-3 w-3" />
                Quick find
              </div>
            </motion.div>

            {/* SEARCH SUGGESTIONS */}
            <AnimatePresence>
              {searchFocused && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute left-0 right-0 mt-2 rounded-[24px] border overflow-hidden ${
                    isLight
                      ? "border-slate-200/70 bg-white/92 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                      : "border-white/10 bg-slate-900/95"
                  }`}
                >
                  <div
                    className={`px-4 pt-4 pb-2 text-[11px] uppercase tracking-[0.16em] ${
                      isLight ? "text-slate-400" : "text-white/35"
                    }`}
                  >
                    Suggestions
                  </div>

                  <div className="pb-2">
                    {searchSuggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseDown={() => setSearch(item.month)}
                        className={`w-full px-4 py-3 text-left flex items-center justify-between transition ${
                          isLight
                            ? "hover:bg-slate-50 text-slate-700"
                            : "hover:bg-white/5 text-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                              isLight
                                ? "bg-slate-100 text-slate-500"
                                : "bg-white/5 text-white/50"
                            }`}
                          >
                            <CalendarDays className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {item.month}
                            </div>
                            <div
                              className={`text-xs ${
                                isLight ? "text-slate-400" : "text-white/35"
                              }`}
                            >
                              Clearance record
                            </div>
                          </div>
                        </div>

                        <div
                          className={`text-xs rounded-full px-2.5 py-1 border ${
                            isLight
                              ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          }`}
                        >
                          {item.status}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="space-y-8">
          {monthGroups.map((group, groupIndex) => (
            <motion.section
              key={group.year}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.06 }}
              className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4 lg:gap-6"
            >
              {/* YEAR LABEL */}
              <div className="lg:pt-2">
                <div
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium border ${
                    isLight
                      ? "border-slate-200/70 bg-white/80 text-slate-700 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
                      : "border-white/10 bg-white/5 text-white/70"
                  }`}
                >
                  {group.year}
                </div>
              </div>

              {/* LINE + ITEMS */}
              <div className="relative pl-8 sm:pl-10">
                <div
                  className={`absolute left-3 sm:left-4 top-2 bottom-2 w-px ${
                    isLight
                      ? "bg-gradient-to-b from-emerald-200 via-slate-200 to-transparent"
                      : "bg-gradient-to-b from-emerald-500/30 via-white/10 to-transparent"
                  }`}
                />

                <div className="space-y-5">
                  {group.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="relative"
                    >
                      {/* node */}
                      <div
                        className={`absolute -left-[25px] sm:-left-[30px] top-7 h-4 w-4 rounded-full ring-4 ${
                          isLight
                            ? "bg-emerald-500 ring-white shadow-[0_0_0_1px_rgba(226,232,240,1)]"
                            : "bg-emerald-400 ring-slate-950"
                        }`}
                      />

                      <div
                        className={`rounded-[26px] border p-5 sm:p-6 relative overflow-hidden transition-all ${
                          isLight
                            ? "border-slate-200/70 bg-white/82 shadow-[0_6px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_35%)]" />

                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div
                              className={`flex items-center gap-2 text-sm ${
                                isLight ? "text-slate-600" : "text-white/65"
                              }`}
                            >
                              <CalendarDays className="h-4 w-4" />
                              Monthly Clearance Record
                            </div>

                            <h3
                              className={`mt-2 text-lg sm:text-[20px] font-semibold tracking-tight ${
                                isLight ? "text-slate-900" : "text-white"
                              }`}
                            >
                              {item.month}
                            </h3>

                            <p
                              className={`mt-2 text-sm ${
                                isLight ? "text-slate-500" : "text-white/45"
                              }`}
                            >
                              Attendance verified and clearance completed
                              successfully.
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                                isLight
                                  ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                                  : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                              }`}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {item.status}
                            </div>
                          </div>
                        </div>

                        {/* tiny footer row */}
                        <div className="relative mt-5 flex flex-wrap items-center gap-2">
                          {["Verified", "Attendance logged", "Completed"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className={`rounded-full px-3 py-1 text-[11px] border ${
                                  isLight
                                    ? "border-slate-200/80 bg-slate-50 text-slate-500"
                                    : "border-white/10 bg-white/5 text-white/45"
                                }`}
                              >
                                {tag}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 rounded-[28px] border ${
              isLight
                ? "border-slate-200/70 bg-white/70 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div
              className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                isLight
                  ? "bg-slate-100 text-slate-500"
                  : "bg-white/5 text-white/50"
              }`}
            >
              <Search className="h-5 w-5" />
            </div>
            <div
              className={`text-base font-medium ${
                isLight ? "text-slate-800" : "text-white"
              }`}
            >
              No clearance records found
            </div>
            <div
              className={`mt-2 text-sm ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              Try searching with a different month or year.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
