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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <main className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-5xl mb-8">Application Tracker</h1>

        <Link
          href="/form"
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + New Application
        </Link>

        {applications.length === 0 ? (
          <p className="text-gray-500">
            No applications yet. Create your first one!
          </p>
        ) : (
          <div className="w-full space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold">{app.position}</h2>
                <p className="text-gray-600">{app.company}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Status:{" "}
                  <span className="font-medium">{app.status || "Not set"}</span>
                </p>
                {app.dateApplied && (
                  <p className="text-sm text-gray-500">
                    Applied: {new Date(app.dateApplied).toLocaleDateString()}
                  </p>
                )}
                {app.notes && (
                  <p className="text-sm text-gray-700 mt-2">{app.notes}</p>
                )}
                {app.url && (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View Job Posting
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
