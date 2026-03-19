import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function PageHeader({ title, subtitle, isLight }) {
  const { setTheme } = useTheme();

  return (
    <div
      className={`mb-6 rounded-3xl border p-5 backdrop-blur-xl flex items-center gap-4 ${
        isLight
          ? "border-slate-200 bg-white/80"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <img src="/logo.png" className="h-12 w-12" />

      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm opacity-70">{subtitle}</p>
      </div>

      <button
        onClick={() => setTheme(isLight ? "dark" : "light")}
        className={`ml-auto rounded-xl border p-2 ${
          isLight
            ? "border-slate-200 text-slate-600 hover:bg-slate-100"
            : "border-white/10 text-white hover:bg-white/10"
        }`}
      >
        {isLight ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
}
