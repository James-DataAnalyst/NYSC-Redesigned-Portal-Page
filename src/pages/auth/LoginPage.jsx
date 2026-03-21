import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Mail, Lock, Sun, Moon, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import bg1 from "@/assets/images/nysc1.jpg";
import bg2 from "@/assets/images/nysc2.jpg";
import bg3 from "@/assets/images/nysc3.jpg";

const slides = [
  {
    image: bg1,
    title: "NYSC Integrated System",
    subtitle:
      "A modern national service portal experience built for speed, clarity, and trust.",
  },
  {
    image: bg2,
    title: "Service and Humility",
    subtitle:
      "Preserving NYSC identity while reimagining the portal with a premium digital experience.",
  },
  {
    image: bg3,
    title: "Empowering Nigerian Youth",
    subtitle:
      "A sleek, dynamic platform concept designed for corps members across every stage of service.",
  },
];

export default function LoginPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = useMemo(() => slides[currentSlide], [currentSlide]);

  // ✅ UPDATED LOGIN HANDLER
  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter your email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${activeSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={activeSlide.image}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        {/* HEADER */}
        <header className="flex items-center justify-between flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-xl sm:px-4"
          >
            <img
              src="/logo.png"
              alt="NYSC"
              className="h-10 sm:h-16 w-auto object-contain drop-shadow-md"
            />
            <div>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-white">
                National Youth Service Corps
              </p>
              <p className="text-xs tracking-widest text-emerald-300">
                SERVICE AND HUMILITY
              </p>
            </div>
          </motion.div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-11 w-11 rounded-xl border border-white/20 bg-white/10 text-white flex items-center justify-center backdrop-blur-xl"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* MAIN */}
        <div className="flex flex-1 items-center">
          <div className="grid w-full gap-10 items-center justify-center">
            {/* LEFT TEXT */}
            <motion.section
              key={currentSlide}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              className="hidden lg:block absolute left-4 bottom-20 sm:left-6 lg:left-8 xl:left-10 xl:bottom-24 max-w-xl z-30 text-white"
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                {activeSlide.title}
              </h1>

              <p className="mt-4 text-white/80 max-w-lg drop-shadow-md">
                {activeSlide.subtitle}
              </p>
            </motion.section>

            {/* LOGIN CARD */}
            <motion.section className="mx-auto w-full max-w-md lg:max-w-lg">
              <Card className="bg-white/10 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-[0_0_0_1px_rgba(16,185,129,0.25)]">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center opacity-80 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-md shadow-md">
                      <img
                        src="/logo.png"
                        alt="NYSC"
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      Welcome Back
                    </h2>
                    <p className="text-sm text-white/70">
                      Sign in to continue to your NYSC portal
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-emerald-300" />
                        <label className="text-sm text-white/90">
                          Email Address
                        </label>
                      </div>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="h-12 rounded-xl border border-white/25 bg-white/15 backdrop-blur-xl
placeholder:text-white/50 text-white
hover:border-emerald-400 focus:border-emerald-400
focus:ring-2 focus:ring-emerald-400/30
transition-all duration-300"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-emerald-300" />
                          <label className="text-sm text-white/90">
                            Password
                          </label>
                        </div>
                        <span className="text-xs text-emerald-300 cursor-pointer">
                          Forgot?
                        </span>
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-12 rounded-xl border border-white/25 bg-white/15 backdrop-blur-xl
placeholder:text-white/50 text-white
hover:border-emerald-400 focus:border-emerald-400
focus:ring-2 focus:ring-emerald-400/30
transition-all duration-300"
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm text-red-400"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <Button
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-300"
                    >
                      {loading ? "Signing in..." : "Login to Portal"}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>

                    <p className="text-xs text-center text-white/60">
                      Secure access for corps members and authorized users.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-6 text-xs text-white/60 border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            © {new Date().getFullYear()} National Youth Service Corps. All
            rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Designed & Developed by{" "}
            <span className="text-emerald-300 font-medium">Isaac James</span> •
            Optimized for performance • Dark mode enabled
          </p>
        </footer>
      </div>
    </div>
  );
}
