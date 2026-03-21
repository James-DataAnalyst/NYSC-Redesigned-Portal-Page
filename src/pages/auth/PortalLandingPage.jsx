import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  LogIn,
  ShieldCheck,
  FileText,
  CreditCard,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BellRing,
  ArrowRight,
  Sparkles,
  Newspaper,
  Quote,
  CheckCircle2,
} from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/banner1.jpg",
    title: "Manage Your NYSC Journey Digitally",
    text: "Access clearance, SAED registration, PPA details, ID card, and service records in one secure portal.",
  },
  {
    id: 2,
    image: "/banner2.jpg",
    title: "Fast, Secure, and Mobile Friendly",
    text: "Enjoy a smoother portal experience across desktop and mobile with a modern dashboard design.",
  },
  {
    id: 3,
    image: "/banner3.jpg",
    title: "Everything You Need in One Place",
    text: "Track registration, service activities, announcements, and official updates without stress.",
  },
];

const stats = [
  { label: "Portal Services", value: 12, suffix: "+" },
  { label: "Corps Tools", value: 8, suffix: "+" },
  { label: "Digital Access", value: 100, suffix: "%" },
  { label: "Support Ready", value: 24, suffix: "/7" },
];

const features = [
  {
    title: "LGA Clearance",
    desc: "Track monthly attendance and clearance status with a premium dashboard experience.",
    icon: ShieldCheck,
  },
  {
    title: "PPA Letter",
    desc: "View and manage your Place of Primary Assignment documents in one place.",
    icon: FileText,
  },
  {
    title: "SAED Program",
    desc: "Register for skill acquisition and entrepreneurship development opportunities.",
    icon: GraduationCap,
  },
  {
    title: "ID Card Access",
    desc: "Preview, manage, and download your corps member ID card quickly.",
    icon: CreditCard,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Aisha Musa",
    role: "Corps Member",
    text: "The new portal feels easier, cleaner, and much faster to use on my phone.",
  },
  {
    id: 2,
    name: "David Okoro",
    role: "Corps Member",
    text: "I can now check my service information without the old stress and confusion.",
  },
  {
    id: 3,
    name: "Chioma Eze",
    role: "Corps Member",
    text: "The dashboard design looks modern and makes important actions easier to find.",
  },
];

const newsItems = [
  {
    id: 1,
    title: "Orientation information and registration guidance updated",
    tag: "Update",
    time: "Today",
  },
  {
    id: 2,
    title: "SAED registration and training support materials now available",
    tag: "SAED",
    time: "2 days ago",
  },
  {
    id: 3,
    title: "Monthly clearance guidance published for corps members",
    tag: "Clearance",
    time: "This week",
  },
];

function CountUp({ end, suffix = "", duration = 1200 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = 16;
    const totalSteps = Math.max(1, Math.floor(duration / stepTime));
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

function FloatingBlob({ className }) {
  return (
    <motion.div
      animate={{
        y: [0, -16, 0],
        x: [0, 8, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    />
  );
}

export default function PortalLandingPage() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingIntro, setLoadingIntro] = useState(true);

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme || "dark" : "dark";
  const isLight = currentTheme === "light";

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setLoadingIntro(false);
    }, 1400);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* LOADING INTRO */}
      <AnimatePresence>
        {loadingIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-slate-950"
          >
            <div className="text-center">
              <motion.img
                src="/logo.png"
                alt="NYSC"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto h-20 w-20 object-contain"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300"
              >
                NYSC Portal
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND BLOBS */}
      <FloatingBlob className="pointer-events-none absolute left-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-2xl dark:bg-emerald-500/20" />
      <FloatingBlob className="pointer-events-none absolute right-[-80px] top-[220px] h-[240px] w-[240px] rounded-full bg-sky-400/10 blur-2xl dark:bg-sky-500/10" />
      <FloatingBlob className="pointer-events-none absolute bottom-[80px] left-[10%] h-[220px] w-[220px] rounded-full bg-lime-400/10 blur-2xl dark:bg-lime-400/10" />

      {/* NYSC PATTERN */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Light mode soft glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 dark:hidden" />

        <motion.div
          animate={{ x: ["-40%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="
      absolute top-16 whitespace-nowrap text-[120px] font-black uppercase tracking-[0.28em]
      text-slate-400/10
      dark:text-white/5
    "
        >
          NYSC • SERVICE • HUMILITY • NYSC • SERVICE • HUMILITY • NYSC • SERVICE
          • HUMILITY •
        </motion.div>
      </div>

      {/* ANNOUNCEMENT BAR */}
      <div className="relative z-20 border-b border-emerald-100/80 bg-emerald-600 text-white dark:border-white/10 dark:bg-emerald-500/15">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] sm:text-xs font-medium">
          <BellRing className="h-4 w-4" />
          Important: Corps members can now access registration, clearance, SAED,
          and ID services through the portal.
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-[999] border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="NYSC"
              className="h-12 w-12 object-contain"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 sm:text-base">
                NATIONAL YOUTH SERVICE CORPS
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-red-500 dark:text-red-300/80">
                Service and Humility
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 transition dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              )}
            </button>

            {/* LOGIN BUTTON */}
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-emerald-400 transition"
            >
              Login Portal
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="self-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-white/5 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Digital Service Portal
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              A smarter and more modern way to manage your
              <span className="text-emerald-600 dark:text-emerald-300">
                {" "}
                NYSC experience
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-white/65 sm:text-lg">
              Access registration, dashboard tools, clearance updates, SAED
              registration, PPA information, ID card services, and official
              notices in one smooth portal experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500"
              >
                <LogIn className="h-4 w-4" />
                Login to Portal
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-slate-200/70 bg-white dark:bg-slate-900 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    <CountUp end={item.value} suffix={item.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-white/45">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* HERO SLIDER */}

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/40 bg-white/70 dark:bg-white/5 p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="relative overflow-hidden rounded-[26px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
                    className="relative"
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="h-[240px] sm:h-[430px] w-full rounded-[24px] object-cover"
                    />

                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-300">
                        Featured Portal Experience
                      </p>

                      <h3 className="mt-1 text-lg font-semibold leading-tight sm:mt-2 sm:text-3xl">
                        {currentSlide.title}
                      </h3>

                      <p className="mt-1 max-w-md text-xs leading-5 text-white/80 sm:mt-2 sm:text-sm sm:leading-6">
                        {currentSlide.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FLOATING MINI CARDS */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-3 top-3 sm:left-6 sm:top-6 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 sm:px-4 sm:py-3 text-slate-800 backdrop-blur-xl dark:border-white/30 dark:bg-white/20 dark:text-white"
              >
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/80">
                  Portal Access
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold">
                  Secure Login
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 right-3 sm:bottom-16 sm:right-6 max-w-[140px] sm:max-w-none rounded-lg border border-slate-200 bg-white/90 px-2 py-1.5 sm:px-3 sm:py-2 text-slate-800 backdrop-blur-xl dark:border-white/30 dark:bg-white/20 dark:text-white"
              >
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/80">
                  Services
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold">
                  All-in-One Dashboard
                </p>
              </motion.div>

              {/* CONTROLS */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlide === index
                          ? "w-8 bg-emerald-500"
                          : "w-2.5 bg-slate-300 dark:bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
            Portal Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Designed to make service year management easier
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-slate-200/70 bg-white dark:bg-slate-900 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/60">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWS + TESTIMONIALS */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* NEWS */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-slate-200/70 bg-white dark:bg-slate-900 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  News & Updates
                </h3>
                <p className="text-sm text-slate-500 dark:text-white/45">
                  Latest portal updates and announcements
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-500 dark:text-white/45">
                        {item.time}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-emerald-600 shadow-sm dark:bg-black/20 dark:text-emerald-300">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TESTIMONIALS */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                <Quote className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Testimonials
                </h3>
                <p className="text-sm text-slate-500 dark:text-white/45">
                  What users are saying about the portal
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-sm leading-7 text-slate-600 dark:text-white/65">
                    “{item.text}”
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-white/45">
                        {item.role}
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 py-10 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-6xl rounded-[34px] border border-emerald-200/70 bg-[linear-gradient(135deg,rgba(16,185,129,0.10),rgba(255,255,255,0.88))] px-6 py-10 text-center shadow-[0_20px_50px_rgba(16,185,129,0.12)] backdrop-blur-xl dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Start Here
          </p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Ready to access your NYSC dashboard?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/60">
            Login to manage your service year records, complete actions, and
            stay updated with official notices.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_38px_rgba(16,185,129,0.24)] transition hover:bg-emerald-500"
          >
            <LogIn className="h-4 w-4" />
            Login Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-white/45">
          {/* LEFT */}
          <p>
            © {new Date().getFullYear()} National Youth Service Corps. All
            rights reserved.
          </p>

          {/* RIGHT */}
          <p className="text-right">
            Designed & Developed by{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Isaac James
            </span>{" "}
            • Optimized for performance • Dark mode enabled
          </p>
        </div>
      </footer>
    </div>
  );
}
