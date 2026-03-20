import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Eye, EyeOff, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/HeaderPage";
import IDCardModal from "@/components/IDCardModal";
import { getDashboardData } from "@/lib/mockDashboardApi";

const meta = {
  title: "Change Password",
  subtitle: "Secure your account by updating your password regularly.",
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
  const [showIDCard, setShowIDCard] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { theme, resolvedTheme, setTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === "light";

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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getDashboardData();
      setUser(data.user);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !user) {
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

            {/* Text */}
            <span className="text-sm font-medium">
              Loading Password Settings...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isLight
          ? "bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]"
          : "bg-[#020617]"
      }`}
    >
      <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-8">
        {/* HEADER */}
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

        {/* ================= CONTENT ================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
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
