import React from "react";
import { Search } from "lucide-react";

export const NetworkFilters = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100">
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member name or code..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        {["ALL", "ACTIVE", "INACTIVE", "LEFT", "RIGHT"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === f
                ? "bg-[#0F172A] text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};
