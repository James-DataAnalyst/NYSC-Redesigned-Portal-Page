import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  Printer,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/HeaderPage";
import IDCardModal from "@/components/IDCardModal";
import { getDashboardData } from "@/lib/mockDashboardApi";

const meta = {
  title: "Place of Primary Assignment",
  subtitle:
    "View your assigned organization and download your official PPA letter.",
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

export default function PPALetterPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIDCard, setShowIDCard] = useState(false);
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
              ? "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          {/* 🔥 SPINNER */}
          <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />

          {/* TEXT */}
          <span className="text-sm font-medium">Loading PPA Letter...</span>
        </motion.div>
      </div>
    );
  }

  const { user } = dashboard;

  // MOCK PPA DATA (replace with API later)
  const ppa = {
    organization: "National Institute for Medical Research",
    address: "Area 11, Garki, Abuja",
    supervisor: "Mr. Adewale Yusuf",
    phone: "08012345678",
    email: "ppa@nigeria.gov.ng",
    status: "Assigned",
    reportingDate: "10 July 2025",
  };

  {
    /* HEADER */
  }

  return (
    <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-8 space-y-8">
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

      <div
        className={`relative overflow-hidden rounded-3xl p-6 border mb-2
  ${
    isLight
      ? "bg-gradient-to-r from-emerald-50 to-white border-emerald-100"
      : "bg-gradient-to-r from-emerald-500/10 to-transparent border-white/10"
  }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-30 blur-2xl bg-emerald-400/20 pointer-events-none" />

        <div className="relative">
          <p className="text-xs uppercase tracking-wider opacity-60">
            Assignment Status
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500 h-5 w-5" />
            {ppa.status}
          </h2>

          <p className="text-sm opacity-70 mt-1">
            Report on {ppa.reportingDate}
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <Button
            className={`w-full sm:w-auto ${
              isLight
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* MAIN CARD */}
        <motion.div
          whileHover={{ y: -4 }}
          className={`rounded-3xl border p-6 ${
            isLight
              ? "bg-white border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
              : "bg-white/[0.04] border-white/10 backdrop-blur-xl"
          }`}
        >
          {/* STATUS */}
          <div className="flex items-start justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              {ppa.status}
            </span>

            <CheckCircle2 className="text-emerald-500 h-5 w-5" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-1">
            {ppa.organization}
          </h2>

          <p className="flex items-center gap-2 text-sm opacity-70 mb-6">
            <MapPin className="h-4 w-4" />
            {ppa.address}
          </p>

          <div className="mt-6 space-y-3">
            <Row label="Supervisor" value={ppa.supervisor} isLight={isLight} />
            <Row
              label="Reporting Date"
              value={ppa.reportingDate}
              isLight={isLight}
            />
            <Row label="Status" value={ppa.status} isLight={isLight} />
            <Row label="Corps Member" value={user.fullName} isLight={isLight} />
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download Letter
            </Button>

            <Button
              className={
                isLight
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white/10 text-white hover:bg-white/15"
              }
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </motion.div>

        {/* SIDE PANEL */}
        <motion.div
          whileHover={{ y: -4 }}
          className={`rounded-3xl border p-6 ${
            isLight
              ? "bg-white border-slate-200"
              : "bg-white/[0.04] border-white/10"
          }`}
        >
          <h3 className="mb-4 font-semibold flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4" />
            PPA Contact
          </h3>

          <div className="space-y-4 text-sm">
            <Info icon={Phone} value={ppa.phone} />
            <Info icon={Mail} value={ppa.email} />
          </div>

          <div className="mt-6 rounded-2xl p-4 border border-emerald-400/20 bg-emerald-500/5">
            <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
              Corps Member
            </p>
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-sm opacity-70">{user.stateCode}</p>
          </div>

          <div className="mt-6 text-xs opacity-60 leading-relaxed">
            Ensure you report with all required documents. Late reporting may
            affect your clearance status.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// COMPONENT
function Info({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 opacity-60" />}
      <span className="opacity-60">{label}</span>
      <span className="font-medium ml-auto">{value}</span>
    </div>
  );
}
function Row({ label, value, isLight }) {
  return (
    <div
      className={`
      flex items-center justify-between 
      rounded-xl px-4 py-3
      border transition-all duration-200
      ${
        isLight
          ? "bg-slate-100 border-slate-300 hover:bg-slate-100/80"
          : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06]"
      }
      `}
    >
      <span
        className={`text-sm font-medium ${
          isLight ? "text-slate-800" : "text-white/70"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
