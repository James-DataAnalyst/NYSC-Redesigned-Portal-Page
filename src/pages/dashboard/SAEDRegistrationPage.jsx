import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ClipboardCheck,
  CalendarDays,
  Users,
  MapPin,
  Award,
  Clock3,
  Download,
  Target,
  BookOpenCheck,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/HeaderPage";
import IDCardModal from "@/components/IDCardModal";
import { getDashboardData } from "@/lib/mockDashboardApi";

const meta = {
  title: "SAED Registration",
  subtitle:
    "Register for Skill Acquisition and Entrepreneurship Development training.",
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

const skillsets = [
  "ICT / Software Development",
  "Fashion Design",
  "Agriculture",
  "Photography",
  "Catering",
  "Film Production",
  "Business Management",
  "Digital Marketing",
];

const instructors = [
  {
    id: 1,
    name: "Mr. Daniel Okafor",
    specialty: "ICT / Software Development",
    role: "Lead Instructor",
  },
  {
    id: 2,
    name: "Mrs. Amina Yusuf",
    specialty: "Fashion Design",
    role: "Enterprise Coach",
  },
  {
    id: 3,
    name: "Mr. Tunde Adebayo",
    specialty: "Business Management",
    role: "Startup Mentor",
  },
];

const trainingSchedule = [
  {
    id: 1,
    day: "Monday",
    title: "Orientation & Introduction to SAED",
    time: "09:00 AM - 11:00 AM",
  },
  {
    id: 2,
    day: "Tuesday",
    title: "Core Practical Session",
    time: "10:00 AM - 01:00 PM",
  },
  {
    id: 3,
    day: "Thursday",
    title: "Workshop / Hands-on Training",
    time: "11:00 AM - 02:00 PM",
  },
  {
    id: 4,
    day: "Friday",
    title: "Mentorship & Assessment",
    time: "09:30 AM - 11:30 AM",
  },
];

const attendanceRecords = [
  { id: 1, week: "Week 1", status: "Present" },
  { id: 2, week: "Week 2", status: "Present" },
  { id: 3, week: "Week 3", status: "Pending" },
  { id: 4, week: "Week 4", status: "Pending" },
];

const batchInfo = {
  batch: "Batch A Stream II",
  group: "Entrepreneurship Cohort 03",
  camp: "NYSC Orientation Camp, Iyana-Ipaja",
};

const deadlineDate = new Date("2026-03-10T23:59:59");

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

export default function SAEDRegistrationPage() {
  const [dashboard, setDashboard] = useState(null);
  const [skill, setSkill] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIDCard, setShowIDCard] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown(deadlineDate));

  const { theme, resolvedTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === "light";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getDashboardData();
      setDashboard(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(deadlineDate));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const attendanceSummary = useMemo(() => {
    const present = attendanceRecords.filter(
      (item) => item.status === "Present",
    ).length;
    const total = attendanceRecords.length;
    const percentage = total ? Math.round((present / total) * 100) : 0;

    return { present, total, percentage };
  }, []);

  const skillProgress = registered ? 68 : skill ? 25 : 0;

  const handleRegister = () => {
    if (!skill) return;
    setRegistered(true);
  };

  const handleDownloadCertificate = () => {
    if (!registered) return;
    alert("Certificate download started.");
  };

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
          className={`flex items-center gap-3 rounded-3xl border px-6 py-5 backdrop-blur-xl ${
            isLight
              ? "border-slate-200/70 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm font-medium">Loading SAED Page...</span>
        </motion.div>
      </div>
    );
  }

  const { user } = dashboard;

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        isLight
          ? "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),transparent_30%),linear-gradient(to_bottom_right,#f8fafc,#ffffff,#f1f5f9)]"
          : "bg-slate-950"
      }`}
    >
      <div className="mx-auto max-w-[1700px] px-4 sm:px-5 lg:px-8 py-4 sm:py-5 lg:py-8 space-y-8">
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
        <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_1fr] gap-6">
          <Card isLight={isLight}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                isLight={isLight}
                icon={GraduationCap}
                title="Registration"
                value={registered ? "Completed" : "Pending"}
                subtitle="SAED enrolment status"
              />
              <StatCard
                isLight={isLight}
                icon={Target}
                title="Skill Progress"
                value={`${skillProgress}%`}
                subtitle="Current learning progress"
              />
              <StatCard
                isLight={isLight}
                icon={ClipboardCheck}
                title="Attendance"
                value={`${attendanceSummary.percentage}%`}
                subtitle="Training attendance rate"
              />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    SAED Learning Progress
                  </p>
                  <p
                    className={`text-xs ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Registration, participation, and completion journey
                  </p>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  {skillProgress}%
                </div>
              </div>

              <div
                className={`h-3 overflow-hidden rounded-full ${
                  isLight ? "bg-slate-100" : "bg-white/10"
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skillProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <StepPill isLight={isLight} active label="Account Ready" />
                <StepPill
                  isLight={isLight}
                  active={!!skill}
                  label="Skill Selected"
                />
                <StepPill
                  isLight={isLight}
                  active={registered}
                  label="Registered"
                />
                <StepPill
                  isLight={isLight}
                  active={registered}
                  label="In Training"
                />
              </div>
            </div>
          </Card>

          <Card isLight={isLight}>
            <SectionTitle
              icon={Clock3}
              title="Registration Deadline"
              isLight={isLight}
            />

            <div
              className={`rounded-[24px] border p-4 ${
                isLight
                  ? "border-emerald-200/70 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(255,255,255,0.85))]"
                  : "border-emerald-500/20 bg-emerald-500/10"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-[0.16em] ${
                  isLight ? "text-emerald-700/70" : "text-emerald-300/70"
                }`}
              >
                Deadline
              </p>
              <h3
                className={`mt-2 text-2xl font-semibold ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                10 Mar 2026
              </h3>
              <p
                className={`mt-1 text-sm ${
                  isLight ? "text-slate-600" : "text-white/60"
                }`}
              >
                Complete your registration before the portal closes.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className={`rounded-2xl border px-4 py-4 text-center ${
                      isLight
                        ? "border-white/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
                        : "border-white/10 bg-black/20"
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
                      className={`mt-1 text-[11px] ${
                        isLight ? "text-slate-500" : "text-white/45"
                      }`}
                    >
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          {/* LEFT */}
          <div className="space-y-6">
            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={BookOpenCheck}
                title="In-Camp Training Registration"
                isLight={isLight}
              />

              <div className="grid gap-4">
                <div>
                  <label
                    className={`mb-2 block text-sm font-medium ${
                      isLight ? "text-slate-700" : "text-white/80"
                    }`}
                  >
                    Select Skillset
                  </label>

                  <Select value={skill} onValueChange={setSkill}>
                    <SelectTrigger
                      className={`h-12 w-full rounded-2xl border shadow-sm ${
                        isLight
                          ? "border-slate-200 bg-white text-slate-900"
                          : "border-white/10 bg-slate-900 text-white"
                      }`}
                    >
                      <SelectValue placeholder="Choose a skill" />
                    </SelectTrigger>

                    <SelectContent
                      className={`rounded-2xl border shadow-xl ${
                        isLight
                          ? "border-slate-200 bg-white text-slate-900"
                          : "border-white/10 bg-slate-900 text-white"
                      }`}
                    >
                      {skillsets.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!skill && (
                    <p className="mt-2 text-xs text-rose-500">
                      This is a required field
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {skill && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`rounded-[22px] border px-4 py-4 ${
                        isLight
                          ? "border-slate-200 bg-slate-50"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <p
                        className={`flex items-center gap-2 text-sm font-medium ${
                          isLight ? "text-slate-800" : "text-white"
                        }`}
                      >
                        <Briefcase className="h-4 w-4" />
                        Selected Skill
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          isLight ? "text-slate-600" : "text-white/65"
                        }`}
                      >
                        {skill}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={handleRegister}
                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    Register
                  </Button>

                  <Button
                    type="button"
                    onClick={handleDownloadCertificate}
                    disabled={!registered}
                    className={`${
                      registered
                        ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                        : "bg-slate-200 text-slate-500 hover:bg-slate-200 dark:bg-white/10 dark:text-white/40 dark:hover:bg-white/10"
                    }`}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>

                <AnimatePresence>
                  {registered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                        isLight
                          ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Registration successful. Your training slot has been
                      reserved.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={CalendarDays}
                title="SAED Training Schedule"
                isLight={isLight}
              />

              <div className="space-y-3">
                {trainingSchedule.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`rounded-[22px] border p-4 ${
                      isLight
                        ? "border-slate-200/70 bg-slate-50/70"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p
                          className={`text-xs uppercase tracking-[0.14em] ${
                            isLight ? "text-slate-400" : "text-white/35"
                          }`}
                        >
                          {item.day}
                        </p>
                        <h4
                          className={`mt-1 text-sm font-medium ${
                            isLight ? "text-slate-900" : "text-white"
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs ${
                          isLight
                            ? "bg-white text-slate-600"
                            : "bg-black/20 text-white/70"
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={Users}
                title="Instructor List"
                isLight={isLight}
              />

              <div className="grid gap-3">
                {instructors.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-[22px] border p-4 ${
                      isLight
                        ? "border-slate-200/70 bg-slate-50/70"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4
                          className={`text-sm font-semibold ${
                            isLight ? "text-slate-900" : "text-white"
                          }`}
                        >
                          {item.name}
                        </h4>
                        <p
                          className={`mt-1 text-sm ${
                            isLight ? "text-slate-600" : "text-white/65"
                          }`}
                        >
                          {item.specialty}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          isLight
                            ? "bg-white text-slate-500"
                            : "bg-black/20 text-white/60"
                        }`}
                      >
                        {item.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={Sparkles}
                title="SAED Resources & Tips"
                isLight={isLight}
              />

              <div className="grid gap-3">
                {[
                  {
                    title: "Business Plan Guide",
                    desc: "Learn how to write a simple business plan for your SAED project.",
                  },
                  {
                    title: "Startup Funding",
                    desc: "Explore NYSC and government grants available for corps members.",
                  },
                  {
                    title: "Skill Certification",
                    desc: "Complete your training to qualify for certification and grants.",
                  },
                  {
                    title: "Entrepreneurship Tips",
                    desc: "Start small, validate your idea, and grow gradually.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className={`rounded-[22px] border p-4 ${
                      isLight
                        ? "border-slate-200/70 bg-slate-50/70"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <h4
                      className={`text-sm font-semibold ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`mt-1 text-sm ${
                        isLight ? "text-slate-600" : "text-white/65"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={ClipboardCheck}
                title="Training Attendance Tracker"
                isLight={isLight}
              />

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <p
                    className={`text-sm font-medium ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    Attendance Completion
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {attendanceSummary.percentage}%
                  </p>
                </div>

                <div
                  className={`h-3 overflow-hidden rounded-full ${
                    isLight ? "bg-slate-100" : "bg-white/10"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceSummary.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {attendanceRecords.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-[20px] border px-4 py-3 ${
                      isLight
                        ? "border-slate-200/70 bg-slate-50/70"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {item.week}
                      </p>
                      <p
                        className={`text-xs ${
                          isLight ? "text-slate-500" : "text-white/45"
                        }`}
                      >
                        Attendance record
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Present"
                          ? isLight
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          : isLight
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={Sparkles}
                title="Skill Progress Tracker"
                isLight={isLight}
              />

              <div className="space-y-4">
                {[
                  { label: "Orientation", value: registered ? 100 : 30 },
                  { label: "Foundation Module", value: registered ? 72 : 0 },
                  { label: "Practical Session", value: registered ? 58 : 0 },
                  { label: "Assessment", value: registered ? 20 : 0 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <p
                        className={`text-sm font-medium ${
                          isLight ? "text-slate-800" : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isLight ? "text-slate-500" : "text-white/50"
                        }`}
                      >
                        {item.value}%
                      </p>
                    </div>

                    <div
                      className={`h-2.5 overflow-hidden rounded-full ${
                        isLight ? "bg-slate-100" : "bg-white/10"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.7 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={MapPin}
                title="Training Location & Batch Grouping"
                isLight={isLight}
              />

              <div
                className={`rounded-[24px] border p-4 ${
                  isLight
                    ? "border-slate-200/70 bg-slate-50/70"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div
                  className={`mb-4 rounded-[22px] border p-4 ${
                    isLight
                      ? "border-slate-200 bg-white"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <div
                    className={`mb-3 flex items-center gap-2 text-sm font-medium ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                    Training Location Map
                  </div>

                  <div
                    className={`flex h-52 items-center justify-center rounded-[18px] border border-dashed ${
                      isLight
                        ? "border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#eef2ff)] text-slate-500"
                        : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] text-white/50"
                    }`}
                  >
                    <div className="text-center">
                      <MapPin className="mx-auto h-6 w-6 mb-2" />
                      <p className="text-sm font-medium">{batchInfo.camp}</p>
                      <p className="text-xs opacity-70 mt-1">
                        Map preview placeholder
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MetaTile
                    isLight={isLight}
                    label="Batch"
                    value={batchInfo.batch}
                  />
                  <MetaTile
                    isLight={isLight}
                    label="Group"
                    value={batchInfo.group}
                  />
                  <MetaTile isLight={isLight} label="Camp" value="Assigned" />
                </div>
              </div>
            </Card>

            <Card isLight={isLight} className="h-full">
              <SectionTitle
                icon={Award}
                title="Certificate Status"
                isLight={isLight}
              />

              <div
                className={`rounded-[22px] border p-4 ${
                  isLight
                    ? "border-slate-200/70 bg-slate-50/70"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      SAED Certificate
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        isLight ? "text-slate-500" : "text-white/55"
                      }`}
                    >
                      {registered
                        ? "Available after successful completion of the programme."
                        : "Certificate becomes available after registration and completion."}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      registered
                        ? isLight
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        : isLight
                          ? "bg-slate-100 text-slate-500 border border-slate-200"
                          : "bg-white/5 text-white/45 border border-white/10"
                    }`}
                  >
                    {registered ? "In Progress" : "Locked"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- UI HELPERS ---------------------------- */

function Card({ children, isLight, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-[28px] border p-5 sm:p-6 ${
        isLight
          ? "border-slate-200/70 bg-white/78 shadow-[0_8px_28px_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "border-white/10 bg-white/5"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, isLight }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
          isLight ? "bg-slate-100 text-slate-600" : "bg-white/5 text-white/70"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3
        className={`text-base font-semibold ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {title}
      </h3>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, isLight }) {
  return (
    <div
      className={`rounded-[24px] border p-4 ${
        isLight
          ? "border-slate-200/70 bg-slate-50/80"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${
          isLight ? "bg-white text-slate-600" : "bg-black/20 text-white/70"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <p className={`text-xs ${isLight ? "text-slate-500" : "text-white/45"}`}>
        {title}
      </p>

      <h4
        className={`mt-1 text-2xl font-semibold tracking-tight ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {value}
      </h4>

      <p
        className={`mt-1 text-xs ${
          isLight ? "text-slate-400" : "text-white/35"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function StepPill({ active, label, isLight }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
        active
          ? isLight
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
            : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
          : isLight
            ? "bg-slate-100 text-slate-400 border border-slate-200"
            : "bg-white/5 text-white/40 border border-white/10"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active ? "bg-emerald-500" : isLight ? "bg-slate-300" : "bg-white/20"
        }`}
      />
      {label}
    </div>
  );
}

function StepLine({ isLight }) {
  return (
    <div className={`h-px w-10 ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
  );
}

function MetaTile({ label, value, isLight }) {
  return (
    <div
      className={`rounded-[20px] border px-4 py-3 ${
        isLight ? "border-slate-200 bg-white" : "border-white/10 bg-black/20"
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.14em] ${
          isLight ? "text-slate-400" : "text-white/35"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-medium ${
          isLight ? "text-slate-800" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
