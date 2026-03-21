<div className="sticky top-4 z-30">
  <div className="relative">
    <motion.div
      animate={{
        y: searchFocused ? -1 : 0,
      }}
      transition={{ duration: 0.18 }}
      className={`group flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-[24px] border transition-all duration-200 ${
        isLight
          ? "bg-white/75 border-slate-200/70 shadow-[0_3px_18px_rgba(15,23,42,0.05)] backdrop-blur-xl focus-within:border-emerald-300/90 focus-within:shadow-[0_10px_30px_rgba(16,185,129,0.10)]"
          : "bg-black/40 border-white/10"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
          isLight
            ? "bg-slate-100 text-slate-500 group-focus-within:bg-emerald-50 group-focus-within:text-emerald-600"
            : "bg-white/5 text-white/60"
        }`}
      >
        <Search className="h-4 w-4" />
      </div>

      <input
        placeholder="Search by month, for example January 2026"
        className={`w-full bg-transparent outline-none text-[16px] sm:text-sm sm:text-[15px] ${
          isLight
            ? "text-slate-900 placeholder:text-slate-400"
            : "text-white placeholder:text-white/35"
        }`}
        value={search}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => {
          setTimeout(() => setSearchFocused(false), 120);
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        className={`hidden sm:flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${
          isLight ? "bg-slate-100 text-slate-500" : "bg-white/5 text-white/45"
        }`}
      >
        <ArrowRight className="h-3 w-3" />
        Quick find
      </div>
    </motion.div>

    {/* SEARCH SUGGESTIONS */}
    <AnimatePresence>
      {searchFocused && searchSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 8, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className={`absolute left-0 right-0 mt-2 rounded-[24px] border overflow-hidden ${
            isLight
              ? "border-slate-200/70 bg-white/92 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              : "border-white/10 bg-slate-900/95"
          }`}
        >
          <div
            className={`px-4 pt-4 pb-2 text-[11px] uppercase tracking-[0.16em] ${
              isLight ? "text-slate-400" : "text-white/35"
            }`}
          >
            Suggestions
          </div>

          <div className="pb-2">
            {searchSuggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={() => setSearch(item.month)}
                className={`w-full px-4 py-3 text-left flex items-center justify-between transition ${
                  isLight
                    ? "hover:bg-slate-50 text-slate-700"
                    : "hover:bg-white/5 text-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isLight
                        ? "bg-slate-100 text-slate-500"
                        : "bg-white/5 text-white/50"
                    }`}
                  >
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.month}</div>
                    <div
                      className={`text-xs ${
                        isLight ? "text-slate-400" : "text-white/35"
                      }`}
                    >
                      Clearance record
                    </div>
                  </div>
                </div>

                <div
                  className={`text-xs rounded-full px-2.5 py-1 border ${
                    isLight
                      ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                  }`}
                >
                  {item.status}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>;
