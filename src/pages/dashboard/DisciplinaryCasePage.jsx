import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ShieldAlert,
  User,
  MessageSquare,
  Send,
  FileWarning,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  Paperclip,
  Filter,
  CalendarDays,
  FileText,
  FolderOpen,
  BadgeAlert,
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
  title: "Disciplinary Case",
  subtitle:
    "View disciplinary records, follow case status, and submit appeals.",
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
    message: "Your next LGA clearance is set for Monday, 11/03/2026.",
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

const disciplinaryHistoryMock = [
  {
    id: 1,
    title: "Absence from CDS Activity",
    description:
      "You were marked absent during the scheduled CDS environmental sanitation exercise.",
    severity: "Medium",
    status: "Under Review",
    date: "2025-08-18",
    year: "2025",
    reference: "DISC-2025-0818",
    officer: "LGA Inspector",
  },
  {
    id: 2,
    title: "Late PPA Attendance Submission",
    description:
      "Monthly attendance documentation was submitted after the expected deadline.",
    severity: "Low",
    status: "Resolved",
    date: "2025-11-05",
    year: "2025",
    reference: "DISC-2025-1105",
    officer: "Zonal Office",
  },
  {
    id: 3,
    title: "Unauthorized Absence from Official Assignment",
    description:
      "A report was filed regarding absence from an officially assigned activity without prior approval.",
    severity: "High",
    status: "Awaiting Appeal",
    date: "2026-01-14",
    year: "2026",
    reference: "DISC-2026-0114",
    officer: "State Secretariat",
  },
];

const appealHistoryMock = [
  {
    id: 1,
    sender: "user",
    message:
      "I respectfully request a review of the reported absence. I had a medical emergency on that date.",
    time: "Jan 15, 2026 • 10:42 AM",
    status: "Submitted",
  },
  {
    id: 2,
    sender: "admin",
    message:
      "Your appeal has been received. Kindly upload supporting medical documentation for validation.",
    time: "Jan 15, 2026 • 02:18 PM",
    status: "Admin Replied",
  },
];

const statusSteps = [
  "Case Logged",
  "Under Review",
  "Appeal Submitted",
  "Admin Review",
  "Resolved",
];

export default function DisciplinaryCasePage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIDCard, setShowIDCard] = useState(false);
  const [appeal, setAppeal] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [appealHistory, setAppealHistory] = useState(appealHistoryMock);
  const pdfRef = useRef(null);

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

  const disciplinaryHistory = disciplinaryHistoryMock;

  const availableYears = useMemo(() => {
    const years = [...new Set(disciplinaryHistory.map((item) => item.year))];
    return ["All", ...years];
  }, [disciplinaryHistory]);

  const filteredCases = useMemo(() => {
    if (selectedYear === "All") return disciplinaryHistory;
    return disciplinaryHistory.filter((item) => item.year === selectedYear);
  }, [disciplinaryHistory, selectedYear]);

  const activeCase =
    filteredCases.find((item) => item.status !== "Resolved") ||
    filteredCases[0] ||
    null;

  const currentStepIndex = useMemo(() => {
    if (!activeCase) return 4;
    if (activeCase.status === "Awaiting Appeal") return 1;
    if (activeCase.status === "Under Review") return 1;
    if (appealHistory.length > 0) return 3;
    if (activeCase.status === "Resolved") return 4;
    return 0;
  }, [activeCase, appealHistory]);

  const summary = useMemo(() => {
    const total = disciplinaryHistory.length;
    const resolved = disciplinaryHistory.filter(
      (item) => item.status === "Resolved",
    ).length;
    const open = total - resolved;
    const percent = total === 0 ? 100 : Math.round((resolved / total) * 100);

    return { total, resolved, open, percent };
  }, [disciplinaryHistory]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleSubmitAppeal = () => {
    if (!appeal.trim() && selectedFiles.length === 0) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      message:
        appeal.trim() || "Appeal submitted with attached supporting documents.",
      time: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      status: "Submitted",
    };

    setAppealHistory((prev) => [...prev, newMessage]);
    setAppeal("");
    setSelectedFiles([]);
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 10;

    if (imgHeight <= pageHeight - 20) {
      pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight + 10;
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }
    }

    pdf.save("disciplinary-case-report.pdf");
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
          <span className="text-sm font-medium">
            Loading Disciplinary Case...
          </span>
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

        <div ref={pdfRef} className="space-y-8">
          {/* TOP SUMMARY */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
            <Card isLight={isLight}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                  isLight={isLight}
                  title="Total Cases"
                  value={String(summary.total)}
                  subtitle="All disciplinary records"
                  icon={ShieldAlert}
                />
                <StatCard
                  isLight={isLight}
                  title="Open Cases"
                  value={String(summary.open)}
                  subtitle="Awaiting review or appeal"
                  icon={BadgeAlert}
                />
                <StatCard
                  isLight={isLight}
                  title="Resolved"
                  value={String(summary.resolved)}
                  subtitle="Closed records"
                  icon={CheckCircle2}
                />
                <StatCard
                  isLight={isLight}
                  title="Resolution Rate"
                  value={`${summary.percent}%`}
                  subtitle="Cases successfully resolved"
                  icon={Clock3}
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
                      Resolution Progress
                    </p>
                    <p
                      className={`text-xs ${
                        isLight ? "text-slate-500" : "text-white/50"
                      }`}
                    >
                      Percentage of cases resolved
                    </p>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {summary.percent}%
                  </div>
                </div>

                <div
                  className={`h-3 overflow-hidden rounded-full ${
                    isLight ? "bg-slate-100" : "bg-white/10"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${summary.percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
                  />
                </div>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <MiniStat label="High Severity" value="1" isLight={isLight} />
                  <MiniStat
                    label="Medium Severity"
                    value="1"
                    isLight={isLight}
                  />
                  <MiniStat label="Low Severity" value="1" isLight={isLight} />
                  <MiniStat
                    label="Last Case"
                    value="Jan 2026"
                    isLight={isLight}
                  />
                </div>
              </div>
            </Card>

            <Card isLight={isLight}>
              <SectionTitle
                icon={Clock3}
                title="Appeal Status Tracker"
                isLight={isLight}
              />

              <div className="grid md:grid-cols-[1fr_1fr] gap-6">
                {/* LEFT – Timeline */}
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const active = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div key={step} className="flex items-start gap-3">
                        <div className="relative mt-0.5">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                              active
                                ? isLight
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                  : "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                                : isLight
                                  ? "border-slate-200 bg-white text-slate-400"
                                  : "border-white/10 bg-white/5 text-white/35"
                            }`}
                          >
                            {index + 1}
                          </div>

                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute left-1/2 top-8 h-8 w-px -translate-x-1/2 ${
                                active
                                  ? isLight
                                    ? "bg-emerald-200"
                                    : "bg-emerald-500/30"
                                  : isLight
                                    ? "bg-slate-200"
                                    : "bg-white/10"
                              }`}
                            />
                          )}
                        </div>

                        <div className="pb-5">
                          <p
                            className={`text-sm font-medium ${
                              active
                                ? isLight
                                  ? "text-slate-900"
                                  : "text-white"
                                : isLight
                                  ? "text-slate-400"
                                  : "text-white/35"
                            }`}
                          >
                            {step}
                          </p>
                          <p
                            className={`mt-1 text-xs ${
                              isCurrent
                                ? isLight
                                  ? "text-emerald-600"
                                  : "text-emerald-300"
                                : isLight
                                  ? "text-slate-500"
                                  : "text-white/45"
                            }`}
                          >
                            {isCurrent
                              ? "Current stage"
                              : "Completed or pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT – Current Case */}
                <div
                  className={`rounded-2xl border px-5 py-4 h-fit ${
                    isLight
                      ? "border-slate-200 bg-slate-50"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className="text-sm font-semibold">Current Case</p>

                  <p
                    className={`text-xs mt-2 ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Unauthorized Absence from Official Assignment
                  </p>

                  <div className="mt-4 text-xs opacity-70">
                    Status: Under Review
                  </div>

                  <div className="mt-2 text-xs opacity-70">
                    Submitted: 12 March 2026
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* INFO + ACTIONS */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
            <Card isLight={isLight}>
              <SectionTitle
                icon={User}
                title="Personal Details"
                isLight={isLight}
              />
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <InfoBox isLight={isLight} label="Name" value={user.fullName} />
                <InfoBox
                  isLight={isLight}
                  label="State Code"
                  value={user.stateCode}
                />
                <InfoBox
                  isLight={isLight}
                  label="Call-Up Number"
                  value={user.callupNo}
                />
              </div>
            </Card>

            <Card isLight={isLight}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <SectionTitle
                    icon={Filter}
                    title="Filter & Export"
                    isLight={isLight}
                    noMargin
                  />
                  <p
                    className={`mt-1 text-sm ${
                      isLight ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Filter case history by year and download report as PDF
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-3">
                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger
                        className={`
    h-11 w-[140px] rounded-2xl border shadow-sm
    ${
      isLight
        ? "border-slate-200 bg-white text-slate-900"
        : "border-white/10 bg-slate-900 text-white"
    }
  `}
                      >
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>

                      <SelectContent
                        className={`
    rounded-xl border shadow-lg
    ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}
  `}
                      >
                        {availableYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CASE HISTORY TIMELINE */}
          <Card isLight={isLight}>
            <SectionTitle
              icon={AlertTriangle}
              title="Disciplinary Case Timeline"
              isLight={isLight}
            />

            {filteredCases.length === 0 ? (
              <AnimatedEmptyState
                isLight={isLight}
                icon={FolderOpen}
                title="No case history found"
                text="There are no disciplinary records for the selected year."
              />
            ) : (
              <div className="space-y-5">
                {filteredCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-7 sm:pl-10"
                  >
                    <div
                      className={`absolute left-2.5 top-0 bottom-0 w-px ${
                        isLight
                          ? "bg-gradient-to-b from-emerald-200 via-slate-200 to-transparent"
                          : "bg-gradient-to-b from-emerald-500/30 via-white/10 to-transparent"
                      }`}
                    />
                    <div
                      className={`absolute left-0 top-6 h-5 w-5 rounded-full ring-4 ${
                        isLight
                          ? "bg-emerald-500 ring-white shadow-[0_0_0_1px_rgba(226,232,240,1)]"
                          : "bg-emerald-400 ring-slate-950"
                      }`}
                    />

                    <div
                      className={`rounded-[24px] border p-5 sm:p-6 ${
                        isLight
                          ? "border-slate-200/70 bg-white/82 shadow-[0_6px_24px_rgba(15,23,42,0.05)]"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <div
                            className={`flex items-center gap-2 text-sm ${
                              isLight ? "text-slate-500" : "text-white/50"
                            }`}
                          >
                            <CalendarDays className="h-4 w-4" />
                            {formatDisplayDate(caseItem.date)}
                          </div>

                          <h3
                            className={`mt-2 text-lg font-semibold ${
                              isLight ? "text-slate-900" : "text-white"
                            }`}
                          >
                            {caseItem.title}
                          </h3>

                          <p
                            className={`mt-2 text-sm leading-7 ${
                              isLight ? "text-slate-600" : "text-white/65"
                            }`}
                          >
                            {caseItem.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <SeverityBadge
                            severity={caseItem.severity}
                            isLight={isLight}
                          />
                          <StatusBadge
                            status={caseItem.status}
                            isLight={isLight}
                          />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <MetaPill
                          isLight={isLight}
                          label="Reference"
                          value={caseItem.reference}
                        />
                        <MetaPill
                          isLight={isLight}
                          label="Reporting Office"
                          value={caseItem.officer}
                        />
                        <MetaPill
                          isLight={isLight}
                          label="Year"
                          value={caseItem.year}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          {/* APPEAL + CHAT */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.15fr] gap-6">
            <Card isLight={isLight}>
              <SectionTitle
                icon={MessageSquare}
                title="Submit Appeal"
                isLight={isLight}
              />

              <div className="space-y-4">
                <textarea
                  value={appeal}
                  onChange={(e) => setAppeal(e.target.value)}
                  rows={6}
                  placeholder="Write your appeal message and provide all important details..."
                  className={`w-full rounded-[22px] border p-4 text-[16px] sm:text-sm outline-none resize-none ${
                    isLight
                      ? "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                      : "border-white/10 bg-white/5 text-white placeholder:text-white/35"
                  }`}
                />

                <div
                  className={`rounded-[22px] border p-4 ${
                    isLight
                      ? "border-slate-200 bg-slate-50/80"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <label
                    className={`mb-3 flex items-center gap-2 text-sm font-medium ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    <Paperclip className="h-4 w-4" />
                    Upload Supporting Files
                  </label>

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className={`block w-full text-[16px] sm:text-sm ${
                      isLight
                        ? "text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                        : "text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                    }`}
                  />

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedFiles.map((file) => (
                        <span
                          key={`${file.name}-${file.size}`}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border ${
                            isLight
                              ? "border-slate-200 bg-white text-slate-600"
                              : "border-white/10 bg-black/20 text-white/70"
                          }`}
                        >
                          <FileText className="h-3 w-3" />
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleSubmitAppeal}
                  className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Appeal
                </Button>
              </div>
            </Card>

            <Card isLight={isLight}>
              <SectionTitle
                icon={FileWarning}
                title="Appeal Discussion"
                isLight={isLight}
              />

              {appealHistory.length === 0 ? (
                <AnimatedEmptyState
                  isLight={isLight}
                  icon={MessageSquare}
                  title="No appeal activity yet"
                  text="Your appeal messages and admin replies will appear here."
                />
              ) : (
                <div className="space-y-4">
                  {appealHistory.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[75%] rounded-[22px] px-4 py-3 border ${
                          msg.sender === "user"
                            ? isLight
                              ? "border-emerald-200 bg-emerald-50 text-slate-800"
                              : "border-emerald-500/20 bg-emerald-500/10 text-white"
                            : isLight
                              ? "border-slate-200 bg-white text-slate-800"
                              : "border-white/10 bg-white/5 text-white"
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-70">
                            {msg.sender === "user" ? "You" : "Admin Reply"}
                          </p>
                          <StatusBadge
                            status={msg.status}
                            isLight={isLight}
                            small
                          />
                        </div>

                        <p className="text-sm leading-7">{msg.message}</p>
                        <p className="mt-3 text-[11px] opacity-60">
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- UI HELPERS -------------------------- */

function Card({ children, isLight }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-[28px] border p-5 sm:p-6 ${
        isLight
          ? "border-slate-200/70 bg-white/78 shadow-[0_8px_28px_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "border-white/10 bg-white/5"
      }`}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, isLight, noMargin = false }) {
  return (
    <div className={`flex items-center gap-2 ${noMargin ? "" : "mb-4"}`}>
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

function StatCard({ title, value, subtitle, icon: Icon, isLight }) {
  return (
    <div
      className={`rounded-[20px] border p-3 sm:p-4 ${
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

function InfoBox({ label, value, isLight }) {
  return (
    <div
      className={`rounded-[22px] border border-dashed p-4 ${
        isLight
          ? "border-slate-200 bg-slate-50/70"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-[0.16em] ${
          isLight ? "text-slate-400" : "text-white/35"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-sm font-medium ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SeverityBadge({ severity, isLight }) {
  const styles = {
    Low: isLight
      ? "border-emerald-100 bg-emerald-50 text-emerald-600"
      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    Medium: isLight
      ? "border-amber-100 bg-amber-50 text-amber-600"
      : "border-amber-500/20 bg-amber-500/10 text-amber-300",
    High: isLight
      ? "border-rose-100 bg-rose-50 text-rose-600"
      : "border-rose-500/20 bg-rose-500/10 text-rose-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium ${styles[severity] || styles.Low}`}
    >
      {severity} Severity
    </span>
  );
}

function StatusBadge({ status, isLight, small = false }) {
  const styles = {
    Resolved: isLight
      ? "border-emerald-100 bg-emerald-50 text-emerald-600"
      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    "Under Review": isLight
      ? "border-amber-100 bg-amber-50 text-amber-600"
      : "border-amber-500/20 bg-amber-500/10 text-amber-300",
    "Awaiting Appeal": isLight
      ? "border-rose-100 bg-rose-50 text-rose-600"
      : "border-rose-500/20 bg-rose-500/10 text-rose-300",
    Submitted: isLight
      ? "border-blue-100 bg-blue-50 text-blue-600"
      : "border-blue-500/20 bg-blue-500/10 text-blue-300",
    "Admin Replied": isLight
      ? "border-violet-100 bg-violet-50 text-violet-600"
      : "border-violet-500/20 bg-violet-500/10 text-violet-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${
        small ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
      } ${
        styles[status] ||
        (isLight
          ? "border-slate-200 bg-slate-50 text-slate-600"
          : "border-white/10 bg-white/5 text-white/60")
      }`}
    >
      {status}
    </span>
  );
}

function MetaPill({ label, value, isLight }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        isLight
          ? "border-slate-200/70 bg-slate-50/70"
          : "border-white/10 bg-white/5"
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

function AnimatedEmptyState({ isLight, icon: Icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-[24px] border py-12 px-6 text-center ${
        isLight
          ? "border-slate-200/70 bg-slate-50/70"
          : "border-white/10 bg-white/5"
      }`}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
          isLight ? "bg-white text-slate-500" : "bg-black/20 text-white/60"
        }`}
      >
        <Icon className="h-6 w-6" />
      </motion.div>

      <h4
        className={`text-base font-semibold ${
          isLight ? "text-slate-800" : "text-white"
        }`}
      >
        {title}
      </h4>
      <p
        className={`mx-auto mt-2 max-w-md text-sm ${
          isLight ? "text-slate-500" : "text-white/50"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

function formatDisplayDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function MiniStat({ label, value, isLight }) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 text-center ${
        isLight ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-sm font-semibold">{value}</div>
      <div
        className={`text-[11px] ${
          isLight ? "text-slate-500" : "text-white/45"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
