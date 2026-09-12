import React from "react";
import { Users, CheckCircle2, ChevronRight } from "lucide-react";
import { EmptyState } from "../../ui/EmptyState";

export const NetworkTable = ({ filteredMembers, setSelectedMember }) => {
  if (filteredMembers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No matching members"
        description="Try adjusting your filter or search criteria to view your downline."
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100/90 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase font-bold text-slate-400">
              <th className="py-3.5 px-6">Member Name</th>
              <th className="py-3.5 px-4">Member ID</th>
              <th className="py-3.5 px-4">Position</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Travel Cycle</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredMembers.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-xs flex items-center justify-center">
                      {m.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900">{m.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                  #{m.memberCode}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      m.position === "LEFT"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {m.position} LEG
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      m.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${m.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    {m.status}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {m.personalTravelBooked ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirmed</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Pending Booking
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-6 text-right">
                  <button
                    onClick={() => setSelectedMember(m)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                    title="View safe summary"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
