"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApplications } from "@/hooks/useApplications";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { applications, loading, error, deleteApplication, updateApplication } =
    useApplications();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      setOpenMenuId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateApplication(id, { status });
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xs">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xs text-red-600">Failed to load applications</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-2">
      <main className="flex flex-col items-center w-full">
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-xs">Loading...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-xs text-red-600">Failed to load applications</p>
          </div>
        )}

        {!loading && !error && (
          <Dashboard
            applications={applications}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>
    </div>
  );
}
