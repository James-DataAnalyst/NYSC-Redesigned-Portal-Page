import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTheme } from "next-themes";
import {
  Bell,
  CreditCard,
  Moon,
  Sun,
  X,
  Download,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function NotificationDropdown({ open, notifications, onClose, isLight }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP (mobile only) */}
          <div
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
    z-[9999] border shadow-xl transition-all
    ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}

    fixed bottom-0 left-0 right-0 w-full sm:h-auto sm:overflow-visible rounded-t-3xl p-4

    sm:absolute sm:left-auto sm:bottom-auto 
    sm:absolute sm:top-16 sm:left-4 sm:w-[320px]
    sm:max-h-[700px] sm:rounded-2xl sm:p-2  pb-4 sm:pb-5
  `}
          >
            {/* DRAG HANDLE (mobile only) */}
            <div className="mb-3 flex justify-center sm:hidden">
              <div className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>

            {/* HEADER */}
            <div className="mb-2 flex items-center justify-between px-2 py-2">
              <h3
                className={`text-sm font-semibold ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Notifications
              </h3>

              <button
                type="button"
                onClick={onClose}
                className={`rounded-lg p-1 transition ${
                  isLight
                    ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-2 pb-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-3 transition-all duration-300 ${
                    isLight
                      ? "border-transparent bg-slate-100/60 hover:bg-emerald-50"
                      : "border-transparent bg-white/[0.04] hover:bg-white/[0.07]"
                  }`}
                >
                  <div
                    className={`mb-1 text-[13px] sm:text-sm font-medium ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {item.title}
                  </div>

                  <p
                    className={`text-xs leading-6 ${
                      isLight ? "text-slate-600" : "text-white/65"
                    }`}
                  >
                    {item.message}
                  </p>

                  <p
                    className={`mt-2 text-[11px] ${
                      isLight ? "text-emerald-600" : "text-emerald-300/80"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function IDField({ label, value }) {
  return (
    <div className="rounded-[18px] border border-[#d9ddd8] bg-[#fbfcfb] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#7b847f]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-bold text-[#1c2520] sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function FakeQR() {
  const cells = Array.from({ length: 64 }, (_, i) => i);
  const filled = new Set([
    0, 1, 2, 3, 4, 6, 8, 10, 11, 12, 14, 16, 17, 18, 20, 22, 24, 26, 27, 28, 30,
    32, 33, 35, 36, 38, 40, 41, 42, 44, 46, 48, 50, 51, 52, 54, 56, 58, 60, 61,
    62, 63,
  ]);

  return (
    <div className="rounded-[14px] border border-[#d7dbd6] bg-white p-2">
      <div className="grid grid-cols-8 gap-[2px]">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`aspect-square rounded-[2px] ${
              filled.has(cell) ? "bg-[#111111]" : "bg-[#eef1ee]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function IDCardFront({ user }) {
  return (
    <div className="id-card scale-[0.75] sm:scale-100 origin-top">
      <div className="w-full h-full overflow-hidden rounded-[26px] border border-[#cfd5cf] bg-[#f7f8f6] shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
        <div className="relative h-full">
          <div className="relative overflow-hidden border-b border-[#d7dbd6] bg-white">
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-full bg-[#1e7a33]" />
              <div className="absolute right-[-5%] top-0 h-full w-[38%] skew-x-[-36deg] bg-[#e0c320]" />
              <div className="absolute left-[18%] top-0 h-full w-[18%] skew-x-[-36deg] bg-[#0f5c26]/95" />
              <div className="absolute right-[18%] top-0 h-full w-[16%] skew-x-[-36deg] bg-[#0f5c26]/95" />
            </div>

            <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <div>
                <p className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[18px]">
                  National Youth Service Corps
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/95 sm:text-[12px]">
                  Corps Member Identity Card
                </p>
              </div>

              <img
                src="/logo.png"
                alt="NYSC"
                className="h-12 w-12 rounded-full bg-white object-contain p-1.5 shadow-md sm:h-16 sm:w-16"
              />
            </div>
          </div>

          <div className="grid h-[calc(100%-78px)] grid-cols-[140px_1fr] gap-3 p-3 sm:grid-cols-[168px_1fr] sm:gap-5 sm:p-6">
            <div className="flex flex-col rounded-[20px] border border-[#d7dbd6] bg-[#f2eee8] p-2 sm:p-3">
              <div className="rounded-[18px] border border-[#e2e4df] bg-white p-1">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-[14px]">
                  <img
                    src={user.photo}
                    alt={user.fullName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="mt-auto pt-3">
                <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                  Corps Member Signature
                </p>
                <div className="mt-2 h-[1px] bg-[#82b997]" />
              </div>
            </div>

            <div className="grid content-start gap-2 sm:gap-4">
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <IDField label="Full Name" value={user.fullName} />
                <IDField label="State Code" value={user.stateCode} />
                <IDField label="Date of Birth" value={user.dateOfBirth} />
                <IDField label="Sex" value="Male" />
                <IDField label="Call-Up Number" value={user.callupNo} />
                <IDField label="Blood Group" value={user.bloodGroup} />
                <IDField label="State of Origin" value={user.stateOfOrigin} />
                <IDField
                  label="State of Deployment"
                  value={user.stateOfDeployment}
                />
              </div>

              <div className="mt-1 grid gap-3 border-t border-[#d7dbd6] pt-3 sm:mt-2 sm:grid-cols-3 sm:gap-5 sm:pt-5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    Corps Member Signature
                  </p>
                  <div className="mt-3 h-[1px] bg-[#cfd5cf]" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    DG’s Signature
                  </p>
                  <div className="mt-3 h-[1px] bg-[#cfd5cf]" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    Valid Till
                  </p>
                  <p className="mt-2 text-[13px] font-bold text-[#1b1f1c] sm:text-[16px]">
                    24-March-2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IDCardBack({ user }) {
  return (
    <div className="id-card scale-[0.75] sm:scale-100 origin-top">
      <div className="w-full h-full overflow-hidden rounded-[26px] border border-[#cfd5cf] bg-[#f7f8f6] shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
        <div className="relative h-full">
          <div className="relative overflow-hidden border-b border-[#d7dbd6] bg-white">
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-full bg-[#458f36]" />
              <div className="absolute right-[-5%] top-0 h-full w-[40%] skew-x-[-36deg] bg-[#e0c320]" />
              <div className="absolute left-[22%] top-0 h-full w-[18%] skew-x-[-36deg] bg-[#127332]/95" />
            </div>

            <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[18px]">
                National Youth Service Corps
              </p>
              <img
                src="/logo.png"
                alt="NYSC"
                className="h-12 w-12 rounded-full bg-white object-contain p-1.5 shadow-md sm:h-16 sm:w-16"
              />
            </div>
          </div>

          <div className="grid h-[calc(100%-78px)] grid-cols-[1fr_96px] gap-3 p-3 sm:grid-cols-[1fr_160px] sm:gap-5 sm:p-6">
            <div className="rounded-[22px] border border-[#d7dbd6] bg-white/70 p-4 sm:p-6">
              <p className="text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                Emergency/NOK: <span className="font-bold">{user.gsm}</span>
              </p>

              <p className="mt-4 text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                This identity card is an official document and related only to
                the person described. Impersonation of the authorized holder,
                card alteration, destruction, transfer to another person, or use
                of this card for criminal offences will be met with appropriate
                sanctions.
              </p>

              <div className="mt-5">
                <p className="text-[10px] font-semibold text-[#1d6f30] sm:text-[12px]">
                  If found, please return to:
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase text-[#1d6f30] sm:text-[12px]">
                  National Directorate Headquarters
                </p>
              </div>

              <div className="mt-6 border-t border-[#d7dbd6] pt-4">
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#6e766f] sm:text-[10px]">
                  Card Verification
                </p>
                <p className="mt-2 text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                  Use the QR area to verify corps member identity details on the
                  portal.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-[22px] border border-[#d7dbd6] bg-[#f3f5f2] p-3 sm:p-4">
              <div className="rounded-[16px] border border-[#d7dbd6] bg-white p-2">
                <FakeQR />
              </div>

              <div className="rounded-[16px] border border-[#d7dbd6] bg-white px-3 py-3 text-center">
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#6e766f] sm:text-[10px]">
                  Valid Till
                </p>
                <p className="mt-2 text-[12px] font-bold text-[#1b1f1c] sm:text-[15px]">
                  24-March-2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HiddenPDFCard({ cardRef, children }) {
  return (
    <div
      ref={cardRef}
      className="fixed left-[-10000px] top-0 bg-white p-8"
      style={{ width: "900px" }}
    >
      {children}
    </div>
  );
}

export default function HeaderPage({
  user,
  meta,
  notifications = [],
  onShowIDCard,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setCountdown(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme || "dark" : "dark";
  const isLight = currentTheme === "light";

  return (
    <header
      className={`relative z-[80] mb-6 rounded-[28px] p-3 sm:p-4 xl:p-6 transition-all
bg-[linear-gradient(135deg,#065f46_0%,#047857_40%,#065f46_100%)]
shadow-[0_20px_60px_rgba(6,95,70,0.55)]
border border-white/10`}
    >
      {/* Animated NYSC background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute whitespace-nowrap text-[120px] font-extrabold uppercase text-white/10 tracking-widest animate-marquee mix-blend-overlay">
          NYSC • NYSC • NYSC • NYSC • NYSC • NYSC • NYSC • NYSC
        </div>
      </div>
      {}
      <div className="flex flex-col justify-center gap-3 sm:gap-4 xl:flex-row xl:items-center xl:justify-between min-h-[130px] sm:min-h-[unset]">
        <div className="flex items-start justify-between w-full">
          <div>
            <div className="flex items-center justify-between w-full">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {meta?.dashboardTitle || "NYSC REGISTRATION PORTAL"}
              </div>
            </div>
            <h1 className="mt-1 text-2xl sm:text-xl xl:text-3xl font-semibold text-white leading-[1.25]">
              {meta?.title || `Welcome back, ${user?.fullName || "User"}`}
            </h1>
            <p className="mt-1 text-[11px] sm:text-xs text-white/80">
              {meta?.subtitle || "Manage your service year efficiently."}
            </p>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end w-full gap-3 sm:gap-4">
          {/* BUTTON ROW (HORIZONTAL) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative rounded-xl border border-white/20 bg-white/10 p-1.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Bell className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white animate-premium-pulse">
                  {notifications.length}
                </span>
              </button>

              <NotificationDropdown
                open={showNotifications}
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                isLight={isLight}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="rounded-xl border border-white/20 bg-white/10 p-1.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              )}
            </button>

            <Button
              type="button"
              onClick={onShowIDCard}
              className="h-9 sm:h-10 xl:h-12 
                                px-3 sm:px-4 xl:px-5 
                                text-xs sm:text-sm 
                                rounded-xl xl:rounded-2xl 
                                bg-white text-emerald-700 
                                shadow-[0_8px_25px_rgba(255,255,255,0.35)]
                                hover:bg-emerald-50
                                transition-all duration-300"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              View ID Card
            </Button>
          </div>

          {/* RIGHT: DATE + TIME */}
          <div className="pr-1 sm:pr-0 text-[10px] sm:text-xs text-white/70 text-right leading-tight">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}

            <div className="text-[11px] font-medium tracking-tight">
              {countdown}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
