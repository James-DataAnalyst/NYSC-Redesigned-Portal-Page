import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileEdit,
  FileText,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  ShieldCheck,
  UserCircle2,
  X,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Footer from "@/components/shared/Footer";

function SidebarLink({
  icon: Icon,
  label,
  active,
  collapsed,
  isLight,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left text-sm transition-all duration-300 ${
        active
          ? isLight
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.10)]"
            : "border-emerald-400/20 bg-emerald-500/15 text-white shadow-[0_12px_32px_rgba(16,185,129,0.12)]"
          : isLight
            ? "border-transparent text-slate-600 hover:border-emerald-100 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(2,6,23,0.06)]"
            : "border-transparent text-white/72 hover:border-white/10 hover:bg-white/8 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
      }`}
      type="button"
    >
      <span
        className={`absolute inset-y-1 left-1 w-1 rounded-full transition-all duration-300 ${
          active
            ? "bg-emerald-400 opacity-100"
            : "bg-emerald-400 opacity-0 group-hover:opacity-70"
        }`}
      />
      <div
        className={`rounded-xl p-2 transition-all duration-300 ${
          active
            ? isLight
              ? "bg-emerald-100 text-emerald-700"
              : "bg-white/10 text-white"
            : isLight
              ? "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700"
              : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
      </div>

      {!collapsed && <span className="truncate font-medium">{label}</span>}

      {!collapsed && (
        <ArrowRight
          className={`ml-auto h-4 w-4 transition-all duration-300 ${
            active
              ? "translate-x-0 opacity-100"
              : "translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        />
      )}
    </button>
  );
}

function MobileSidebar({
  open,
  onClose,
  navItems,
  activePath,
  navigateTo,
  isLight,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 24, stiffness: 250 }}
            className={`fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r p-4 backdrop-blur-2xl lg:hidden ${
              isLight
                ? "border-slate-200 bg-white/95"
                : "border-white/10 bg-slate-950/95"
            }`}
          >
            <div>
              <div
                className={`mb-6 flex items-center justify-between border-b pb-4 ${
                  isLight ? "border-slate-200" : "border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="NYSC"
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      NYSC
                    </p>
                    <p
                      className={`text-[11px] uppercase tracking-[0.2em] ${
                        isLight ? "text-emerald-600" : "text-emerald-300/80"
                      }`}
                    >
                      Portal
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className={`rounded-xl p-2 transition ${
                    isLight
                      ? "text-slate-500 hover:bg-slate-100"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon || Home;
                  const active = activePath === item.path;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        navigateTo(item.path);
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition-all duration-200 ${
                        active
                          ? isLight
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-emerald-400/20 bg-emerald-500/15 text-white"
                          : isLight
                            ? "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                            : "border-transparent text-white/72 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-auto border-t pt-4 ${
                isLight ? "border-slate-200" : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between px-2 py-3">
                <p
                  className={`text-sm font-medium ${
                    isLight ? "text-emerald-600" : "text-emerald-300"
                  }`}
                >
                  Isaac James
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/james-bideveloper/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition ${
                      isLight
                        ? "text-slate-500 hover:text-emerald-600"
                        : "text-white/60 hover:text-emerald-300"
                    }`}
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>

                  <a
                    href="mailto:jamex361@gmail.com"
                    className={`transition ${
                      isLight
                        ? "text-slate-500 hover:text-emerald-600"
                        : "text-white/60 hover:text-emerald-300"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, resolvedTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme || "dark" : "dark";
  const isLight = currentTheme === "light";

  const navItems = useMemo(
    () => [
      {
        label: "My Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Change Password",
        path: "/change-password",
        icon: KeyRound,
      },
      {
        label: "Course Correction",
        path: "/course-correction",
        icon: FileEdit,
      },
      {
        label: "PPA Letter",
        path: "/ppa-letter",
        icon: FileText,
      },
      {
        label: "LGA Clearance",
        path: "/lga-clearance",
        icon: ShieldCheck,
      },
      {
        label: "Disciplinary Case",
        path: "/disciplinary-case",
        icon: AlertTriangle,
      },
      {
        label: "SAED Registration",
        path: "/saed-registration",
        icon: Briefcase,
      },
      {
        label: "Logout",
        path: "/logout",
        icon: LogOut,
      },
    ],
    [],
  );

  const activePath = location.pathname;

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLight
          ? "bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900"
          : "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.10),transparent_25%),#020617] text-white"
      }`}
    >
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        navItems={navItems}
        activePath={activePath}
        navigateTo={handleNavigate}
        isLight={isLight}
      />

      {/* ================= MOBILE HEADER (ONLY ADDITION) ================= */}
      <div
        className={`lg:hidden flex items-center justify-between px-4 py-3 border-b ${
          isLight ? "border-slate-200 bg-white" : "border-white/10 bg-slate-950"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className={`rounded-xl p-2 ${
            isLight
              ? "text-slate-600 hover:bg-slate-100"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          {/* simple 3-line menu icon (no import needed) */}
          <div className="space-y-1">
            <div className="h-0.5 w-5 bg-current" />
            <div className="h-0.5 w-5 bg-current" />
            <div className="h-0.5 w-5 bg-current" />
          </div>
        </button>

        <p
          className={`text-sm font-semibold ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          NYSC Portal
        </p>
      </div>

      <div className="flex min-h-screen">
        <aside
          className={`hidden border-r backdrop-blur-2xl transition-all duration-300 lg:flex lg:flex-col ${
            sidebarCollapsed ? "w-[88px]" : "w-[290px]"
          } ${
            isLight
              ? "border-slate-200 bg-white/70"
              : "border-white/10 bg-slate-950/60"
          }`}
        >
          <div
            className={`flex items-center justify-between border-b px-4 py-4 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/logo.png"
                alt="NYSC"
                className="h-11 w-11 shrink-0 object-contain"
              />
              {!sidebarCollapsed && (
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    NYSC Portal
                  </p>
                  <p
                    className={`text-[11px] uppercase tracking-[0.2em] ${
                      isLight ? "text-emerald-600" : "text-emerald-300/80"
                    }`}
                  >
                    Redesign
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className={`rounded-xl p-2 transition ${
                isLight
                  ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="px-3 py-4">
            <p
              className={`mb-3 px-2 text-xs uppercase tracking-[0.2em] ${
                isLight ? "text-slate-400" : "text-white/40"
              } ${sidebarCollapsed ? "hidden" : "block"}`}
            >
              Actions
            </p>

            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon || Home;

                return (
                  <div
                    key={item.label}
                    onClick={() => handleNavigate(item.path)}
                    className="cursor-pointer"
                  >
                    <SidebarLink
                      icon={Icon}
                      label={item.label}
                      active={activePath === item.path}
                      collapsed={sidebarCollapsed}
                      isLight={isLight}
                      onClick={() => handleNavigate(item.path)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`mt-auto border-t p-4 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div
              className={`rounded-3xl border p-4 backdrop-blur-xl transition-all duration-200 ${
                isLight
                  ? "border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="h-[60px] mt-2 flex items-center justify-center">
                {!sidebarCollapsed ? (
                  <div className="flex items-center gap-3">
                    <p
                      className={`font-semibold ${
                        isLight ? "text-emerald-600" : "text-emerald-300"
                      }`}
                    >
                      Isaac James
                    </p>

                    <a
                      href="https://www.linkedin.com/in/james-bideveloper/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition ${
                        isLight
                          ? "text-slate-500 hover:text-emerald-600"
                          : "text-white/60 hover:text-emerald-300"
                      }`}
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </a>

                    <a
                      href="mailto:jamex361@gmail.com"
                      className={`transition ${
                        isLight
                          ? "text-slate-500 hover:text-emerald-600"
                          : "text-white/60 hover:text-emerald-300"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FaLinkedin className="h-5 w-5" />
                    <Mail className="h-5 w-5" />
                    <UserCircle2
                      className={`h-6 w-6 ${
                        isLight ? "text-emerald-600" : "text-emerald-300"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="relative z-10 flex-1">
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              <Outlet
                context={{ mobileSidebarOpen, setMobileSidebarOpen, isLight }}
              />
            </div>

            <div className="px-4 sm:px-5 lg:px-8 pb-6 pt-2">
              <Footer isLight={isLight} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
