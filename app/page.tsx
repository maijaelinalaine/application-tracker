"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Application {
  id: number;
  position: string;
  company: string;
  dateApplied: string | null;
  status: string;
  notes: string | null;
  url: string | null;
  createdAt: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this application?")) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications(applications.filter((app) => app.id !== id));
        setOpenMenuId(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xs">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-2">
      <main className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-3">Application Tracker</h1>

        <Link
          href="/form"
          className="mb-3 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
        >
          + New Application
        </Link>

        {applications.length === 0 ? (
          <p className="text-xs text-gray-500">
            No applications yet. Create your first one!
          </p>
        ) : (
          <div className="w-full space-y-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border border-gray-300 rounded p-2 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">{app.position}</h2>
                    <p className="text-xs text-gray-600">{app.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Status:{" "}
                      <span className="font-medium">
                        {app.status || "Not set"}
                      </span>
                    </p>
                    {app.dateApplied && (
                      <p className="text-xs text-gray-500">
                        Applied:{" "}
                        {new Date(app.dateApplied).toLocaleDateString()}
                      </p>
                    )}
                    {app.notes && (
                      <p className="text-xs text-gray-700 mt-1">{app.notes}</p>
                    )}
                    {app.url && (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-xs hover:underline"
                      >
                        View Job Posting
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === app.id ? null : app.id)
                      }
                      className="text-gray-600 hover:text-gray-900 p-1 text-lg"
                    >
                      ···
                    </button>
                    {openMenuId === app.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <Link
                          href={`/form/${app.id}`}
                          className="block px-3 py-1 text-xs hover:bg-gray-100 text-gray-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="w-full text-left px-3 py-1 text-xs hover:bg-gray-100 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
