import React, { useState, useEffect } from "react";
import { networkApi } from "../../api";
import { TableSkeleton } from "../ui/Skeleton";
import { NetworkKPICards } from "./network/NetworkKPICards";
import { NetworkFilters } from "./network/NetworkFilters";
import { NetworkTable } from "./network/NetworkTable";
import { MemberSummaryModal } from "./network/MemberSummaryModal";

export const NetworkPage = () => {
  const [overview, setOverview] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    networkApi
      .getOverview()
      .then((res) => {
        if (res.success) setOverview(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <TableSkeleton rows={6} />;

  const members = overview?.members || [];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") return m.status === "ACTIVE";
    if (filter === "INACTIVE") return m.status !== "ACTIVE";
    if (filter === "LEFT") return m.position === "LEFT";
    if (filter === "RIGHT") return m.position === "RIGHT";
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            My Referral Community & Downline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Directory of registered sponsors and active travel members across
            your binary organization.
          </p>
        </div>
      </div>

      <NetworkKPICards overview={overview} />

      <NetworkFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <NetworkTable
        filteredMembers={filteredMembers}
        setSelectedMember={setSelectedMember}
      />

      <MemberSummaryModal
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </div>
  );
};
