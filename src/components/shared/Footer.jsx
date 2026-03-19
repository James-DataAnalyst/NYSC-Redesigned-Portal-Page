export default function Footer({ isLight }) {
  return (
    <footer
      className={`mt-10 flex flex-col items-center justify-between gap-2 border-t pt-4 text-xs sm:flex-row ${
        isLight
          ? "border-slate-200 text-slate-500"
          : "border-white/10 text-white/60"
      }`}
    >
      <p>
        © {new Date().getFullYear()} National Youth Service Corps. All rights
        reserved.
      </p>

      <p className="text-center sm:text-right">
        Designed & Developed by{" "}
        <span
          className={
            isLight
              ? "font-medium text-emerald-600"
              : "font-medium text-emerald-300"
          }
        >
          Isaac James
        </span>{" "}
        • Optimized for performance • Dark mode enabled
      </p>
    </footer>
  );
}
