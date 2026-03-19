import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Bell,
  Moon,
  Sun,
  CreditCard,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// =============================
// MAIN PAGE
// =============================
export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { theme, resolvedTheme, setTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === "light";
  const notifications = [
    {
      id: 1,
      title: "Monthly clearance scheduled",
      message: "Your next LGA clearance is set for Monday, 09/03/2026.",
      time: "2h ago",
    },
    {
      id: 2,
      title: "ID card available",
      message: "You can now view and download your corps member ID card.",
      time: "1d ago",
    },
    {
      id: 3,
      title: "Portal update",
      message: "Dark mode and premium dashboard redesign concept loaded.",
      time: "Just now",
    },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const strength = useMemo(() => {
    let score = 0;
    if (newPassword.length > 6) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    return score;
  }, [newPassword]);

  const strengthLabel = ["Weak", "Fair", "Good", "Strong"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen ${
        isLight
          ? "bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]"
          : "bg-[#020617]"
      }`}
    >
      <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-8">
        {/* ================= PREMIUM HEADER ================= */}
        <header
          className={`relative z-[80] mb-6 rounded-[28px] p-5 sm:p-6 ${
            isLight
              ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 text-white shadow-[0_20px_60px_rgba(16,185,129,0.35)]"
              : "bg-gradient-to-r from-emerald-700 via-emerald-800 to-green-900 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* Animated Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-10%] top-[2%] -translate-y-1/2 whitespace-nowrap text-[90px] font-extrabold uppercase opacity-[0.05] animate-marquee">
              NYSC • NYSC • NYSC • NYSC • NYSC • NYSC
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-2 sm:gap-4 items-center">
              <img
                src="/logo.png"
                alt="NYSC"
                className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
              />

              <div className="leading-tight">
                <h1 className="text-lg sm:text-3xl font-semibold text-white">
                  Change Password
                </h1>
                <p className="text-[11px] sm:text-xs text-white/80">
                  Secure your account by updating your password regularly.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* DATE */}
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-md">
                Today’s Date: Wednesday, March 18, 2026
              </div>

              {/* NOTIFICATION */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20"
                >
                  <Bell className="h-5 w-5" />

                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
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

              {/* THEME */}
              <button
                onClick={() => setTheme(isLight ? "dark" : "light")}
                className="rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20"
              >
                {isLight ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              {/* BUTTON */}
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="h-12 rounded-2xl bg-white px-5 text-emerald-700 hover:bg-emerald-100"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl border p-6 ${
              isLight
                ? "border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <h2 className="mb-5 flex items-center gap-2 font-semibold">
              <Lock className="h-4 w-4" />
              Update Credentials
            </h2>

            <InputField
              label="Old Password"
              value={oldPassword}
              setValue={setOldPassword}
              show={showOld}
              setShow={setShowOld}
              isLight={isLight}
            />

            <InputField
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
              show={showNew}
              setShow={setShowNew}
              isLight={isLight}
            />

            {newPassword && (
              <div className="mb-5">
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs opacity-70">
                  Strength: {strengthLabel[strength - 1] || "Very Weak"}
                </p>
              </div>
            )}

            <InputField
              label="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              show={showConfirm}
              setShow={setShowConfirm}
              isLight={isLight}
            />

            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mb-3 text-sm text-red-500">
                Passwords do not match
              </p>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2 text-sm text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                Password updated successfully
              </div>
            )}

            <Button className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500">
              {submitting ? "Updating..." : "Change Password"}
            </Button>
          </motion.form>

          {/* SIDE PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl border p-6 ${
              isLight
                ? "border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Security Tips
            </h2>

            <ul className="space-y-3 text-sm opacity-80">
              <li>✔ Use at least 8 characters</li>
              <li>✔ Include uppercase & numbers</li>
              <li>✔ Avoid common passwords</li>
              <li>✔ Don’t reuse old passwords</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function NotificationDropdown({ open, notifications, onClose, isLight }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ================= MOBILE BACKDROP ================= */}
          <div
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={onClose}
          />

          {/* ================= DROPDOWN / MOBILE SHEET ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`
    z-[9999] border transition-all
    ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}

    fixed bottom-0 left-0 right-0 rounded-t-3xl p-4
    sm:absolute sm:right-0 sm:top-16 sm:w-[320px] sm:rounded-2xl sm:p-3
  `}
          >
            {/* DRAG HANDLE (mobile) */}
            <div className="mb-3 flex justify-center sm:hidden">
              <div className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>
            <div className="mb-2 flex items-center justify-between px-2 py-2">
              <h3
                className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}
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

            <div className="space-y-3 pb-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-3 transition-all ${
                    isLight
                      ? "bg-white border border-slate-200 hover:bg-emerald-50 shadow-sm"
                      : "bg-white/[0.05] border border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {item.title}
                  </p>

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

// ================= INPUT FIELD =================
function InputField({ label, value, setValue, show, setShow, isLight }) {
  return (
    <div className="mb-5">
      <label className="mb-1 block text-sm">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full rounded-2xl px-4 py-3 pr-10 outline-none transition-all ${
            isLight
              ? "bg-white shadow-[0_0_0_1px_rgba(16,185,129,0.25)] focus:shadow-[0_0_0_2px_rgba(16,185,129,0.5)] hover:shadow-[0_0_0_2px_rgba(16,185,129,0.4)]"
              : "bg-white/5 shadow-[0_0_0_1px_rgba(16,185,129,0.2)] focus:shadow-[0_0_0_2px_rgba(16,185,129,0.5)]"
          }`}
        />

        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-3 opacity-70"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
