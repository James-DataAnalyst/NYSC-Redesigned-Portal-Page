import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  GraduationCap,
  BookOpen,
  Award,
  Send,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderPage from "@/components/HeaderPage";
import IDCardModal from "@/components/IDCardModal";
import { getDashboardData } from "@/lib/mockDashboardApi";

const meta = {
  title: "Course Correction",
  subtitle: "Update your academic information for your NYSC records.",
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

export default function CourseCorrectionPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [course, setCourse] = useState("");
  const [degreeClass, setDegreeClass] = useState("");
  const [qualification, setQualification] = useState("");
  const [showIDCard, setShowIDCard] = useState(false);

  const { theme, resolvedTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === "light";

  useEffect(() => {
    async function load() {
      const data = await getDashboardData();
      setDashboard(data);
      setCourse(data.user.course);
      setQualification(data.user.award);
      setDegreeClass(data.user.degreeClass || "First Class");
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
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
          className={`rounded-3xl border px-6 py-5 backdrop-blur-xl ${
            isLight
              ? "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Spinner */}
            <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />

            {/* TEXT */}
            <span className="text-sm font-medium">
              Loading Course Correction...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  const { user } = dashboard;

  return (
    <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-8">
      {/* ================= HEADER ================= */}
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

      {/* ================= GRID ================= */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* ================= FORM ================= */}
        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ y: -4 }}
          className={`rounded-3xl border p-6 flex flex-col justify-between min-h-full transition-all ${
            isLight
              ? "bg-white border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
              : "bg-white/[0.04] border-white/10 backdrop-blur-xl"
          }`}
        >
          {/* 🔥 TOP SECTION */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4" />
              Update Course Details
            </h2>

            <SelectField
              label="Course"
              value={course}
              setValue={setCourse}
              options={[
                "Agricultural Science",
                "Computer Science",
                "Engineering",
              ]}
              isLight={isLight}
            />

            <SelectField
              label="Class of Degree"
              value={degreeClass}
              setValue={setDegreeClass}
              options={[
                "First Class",
                "Second Class Upper",
                "Second Class Lower",
              ]}
              isLight={isLight}
            />

            <SelectField
              label="Qualification"
              value={qualification}
              setValue={setQualification}
              options={["BSc", "HND", "ND"]}
              isLight={isLight}
            />
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${course}-${degreeClass}-${qualification}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`rounded-2xl border p-4 ${
                  isLight
                    ? "bg-gradient-to-b from-white to-emerald-50/40 border-emerald-100"
                    : "bg-white/[0.03] border-emerald-500/10 backdrop-blur-xl"
                }`}
              >
                {/* HEADER */}
                <div className="text-xs uppercase tracking-wide opacity-60 mb-3">
                  Updated Preview
                </div>

                {/* CONTENT */}
                <div className="space-y-2 text-sm">
                  <PreviewRow label="Course" value={course} />
                  <PreviewRow label="Class" value={degreeClass} />
                  <PreviewRow label="Qualification" value={qualification} />
                </div>
              </motion.div>
            </AnimatePresence>
            {success && (
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Request submitted successfully
              </div>
            )}
          </div>

          {/* 🔥 BOTTOM SECTION */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500"
            >
              {submitting ? "Submitting..." : "Send Request"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.form>

        {/* ================= SIDE INFO ================= */}
        <motion.div
          whileHover={{ y: -4 }}
          className={`rounded-3xl border p-6 ${
            isLight
              ? "bg-white border-slate-200"
              : "bg-white/[0.04] border-white/10"
          }`}
        >
          <h3 className="mb-5 font-semibold flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4" />
            Your Current Details
          </h3>

          <div className="space-y-4">
            <Row label="Name" value={user.fullName} isLight={isLight} />
            <Row label="Matric No" value={user.matricNo} isLight={isLight} />
            <Row
              label="Institution"
              value={user.institution}
              isLight={isLight}
            />
            <Row label="Course" value={user.course} isLight={isLight} />
            <Row label="Award" value={user.award} isLight={isLight} />
          </div>

          <div className="mt-6 text-xs opacity-70">
            Ensure your details are correct before submitting your request.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ================= SELECT =================
function SelectField({ label, value, setValue, options, isLight }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label}</label>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          className={`w-full h-12 rounded-2xl px-4 border transition-all duration-200
          focus:ring-0 focus:ring-offset-0 focus:outline-none
          data-[state=open]:border-emerald-500 data-[state=open]:ring-4 data-[state=open]:ring-emerald-500/10
          ${
            isLight
              ? "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 focus:border-emerald-500"
              : "border-white/10 bg-[#0f172a] text-white hover:border-emerald-400/40 focus:border-emerald-500"
          }`}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className={`z-50 rounded-2xl border p-1 shadow-[0_18px_50px_rgba(16,185,129,0.18)]
          ${
            isLight
              ? "bg-white border-emerald-200 text-slate-800"
              : "bg-[#0b1220] border-emerald-500/20 text-white"
          }`}
        >
          {options.map((opt) => (
            <SelectItem
              key={opt}
              value={opt}
              className={`relative flex items-center pr-8 pl-3 py-2.5 text-sm rounded-xl cursor-pointer outline-none
${
  isLight
    ? "focus:bg-emerald-50 data-[highlighted]:bg-emerald-50 data-[highlighted]:text-emerald-700"
    : "focus:bg-emerald-500/10 data-[highlighted]:bg-emerald-500/10 data-[highlighted]:text-emerald-300"
}`}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PreviewRow({ label, value }) {
  return (
    <motion.div layout className="flex items-center justify-between">
      <span className="opacity-60">{label}</span>

      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="font-semibold text-emerald-600 dark:text-emerald-400"
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
// ================= ROW =================
function Row({ label, value, isLight }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group relative overflow-hidden flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl pl-6 pr-4 py-3 border transition-all

before:absolute before:inset-0 before:rounded-2xl
before:bg-gradient-to-r before:from-emerald-500/0 before:to-emerald-500/5
before:opacity-0 group-hover:before:opacity-100 before:transition-all

${
  isLight
    ? "bg-white border-slate-200"
    : "bg-white/[0.04] border-white/10 backdrop-blur-xl"
}
hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)]`}
    >
      {/* ACCENT BAR (FIXED) */}
      <div className="absolute left-2 top-3 h-[70%] w-[3px] rounded-full bg-emerald-500/70 group-hover:bg-emerald-500 transition-all" />

      {/* CONTENT */}
      <div className="pl-4">
        <div className="text-[11px] uppercase tracking-wider opacity-60 mb-1">
          {label}
        </div>

        <div className="font-semibold text-sm leading-snug break-words">
          {value}
        </div>
      </div>
    </motion.div>
  );
}
