"use client";

import { Bell, ExternalLink, Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

interface DashboardProps {
  applications: Application[];
  onDelete?: (id: number) => void;
  onStatusChange?: (id: number, status: string) => void;
}

const STATUS_OPTIONS = [
  "apply",
  "applied",
  "assessment",
  "interview",
  "offer",
  "rejected",
];

export default function Dashboard({
  applications,
  onDelete,
  onStatusChange,
}: DashboardProps) {
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [dismissedReminders, setDismissedReminders] = useState<Set<number>>(
    new Set(),
  );
  const totalApps = applications.length;

  const today = new Date();
  const upcomingDeadlines = applications
    .filter((app) => app.status === "apply" && app.dateApplied)
    .filter((app) => new Date(app.dateApplied!) > today)
    .sort(
      (a, b) =>
        new Date(a.dateApplied!).getTime() - new Date(b.dateApplied!).getTime(),
    );

  const tasks = [
    ...applications
      .filter((app) => app.status === "apply" && app.dateApplied)
      .filter((app) => new Date(app.dateApplied!) > today)
      .slice(0, 2)
      .map((app) => ({
        id: app.id,
        title: `Apply to ${app.company}`,
        position: app.position,
        due: app.dateApplied!,
        color: "bg-indigo-50",
      })),
    ...applications
      .filter((app) => app.status === "interview")
      .slice(0, 2)
      .map((app) => ({
        id: app.id,
        title: `Prepare for ${app.company} interview`,
        position: app.position,
        due: app.dateApplied || new Date().toISOString(),
        color: "bg-pink-50",
      })),
    ...applications
      .filter((app) => app.status === "assessment")
      .slice(0, 2)
      .map((app) => ({
        id: app.id,
        title: `Complete ${app.company} assessment`,
        position: app.position,
        due: app.dateApplied || new Date().toISOString(),
        color: "bg-blue-50",
      })),
    ...applications
      .filter((app) => app.status === "offer")
      .slice(0, 2)
      .map((app) => ({
        id: app.id,
        title: `Respond to ${app.company} offer`,
        position: app.position,
        due: app.dateApplied || new Date().toISOString(),
        color: "bg-green-50",
      })),
  ].slice(0, 6);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      apply: "text-gray-600 bg-gray-100",
      applied: "text-blue-600 bg-blue-100",
      assessment: "text-purple-600 bg-purple-100",
      interview: "text-pink-600 bg-pink-100",
      offer: "text-green-600 bg-green-100",
      rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 mb-18 px-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Application Dashboard</h1>
          <p className="text-base text-gray-600">
            Track and manage your job applications
          </p>
        </div>
        <Link
          href="/form"
          className="px-5 py-2.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-base font-medium"
        >
          + New Application
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-md border-1 border-blue-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-7 h-7 text-indigo-600" />
                <h2 className="text-base font-semibold">Reminders & Notes</h2>
              </div>
            </div>
            <p className="text-base text-gray-500 mb-6">
              Keep track of important dates and tasks
            </p>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-base text-gray-400">No tasks yet</p>
              ) : (
                tasks
                  .filter((task) => !dismissedReminders.has(task.id))
                  .map((task, idx) => (
                    <div key={idx} className={`${task.color} p-5 rounded`}>
                      <div className="flex items-start gap-3.5">
                        <input type="checkbox" className="mt-1.5" />
                        <div className="flex-1">
                          <div className="text-base font-medium">
                            {task.title}
                          </div>
                          <div className="text-base text-gray-600 mt-1">
                            {task.position}
                          </div>
                          <div className="text-base text-gray-500 mt-1">
                            Due: {new Date(task.due).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setDismissedReminders(
                              new Set([...dismissedReminders, task.id]),
                            )
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-md border p-6">
            <div className="mb-4">
              <h2 className="text-base font-semibold">All Applications</h2>
              <p className="text-base text-gray-600">
                View and manage your job applications
              </p>
            </div>

            <div className="space-y-3">
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b text-base font-semibold text-gray-600">
                <div className="col-span-4">Position</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {applications.length === 0 ? (
                <div className="py-10 text-center text-gray-500 text-base">
                  No applications yet. Create your first one!
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="border-b pb-4 hover:bg-gray-50 px-4 py-4 rounded"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-base md:items-center">
                      <div className="md:col-span-4 min-w-0">
                        <div className="text-base md:hidden font-semibold text-gray-600 mb-1.5">
                          Position
                        </div>
                        <div className="font-semibold text-base">
                          {app.position}
                        </div>
                        {app.notes && (
                          <div className="text-gray-500 text-base mt-0.5 whitespace-normal break-words">
                            {app.notes}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <div className="text-base md:hidden font-semibold text-gray-600 mb-1.5">
                          Company
                        </div>
                        <span className="text-gray-800 hover:underline cursor-pointer">
                          {app.company}
                        </span>
                      </div>

                      <div className="md:col-span-2">
                        <div className="text-base md:hidden font-semibold text-gray-600 mb-1.5">
                          Status
                        </div>
                        {editingStatusId === app.id ? (
                          <select
                            autoFocus
                            value={app.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              onStatusChange?.(app.id, newStatus);
                              setEditingStatusId(null);
                            }}
                            onBlur={() => setEditingStatusId(null)}
                            className="px-4 py-2.5 border rounded text-base font-small w-full"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div
                            onClick={() => setEditingStatusId(app.id)}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <span
                              className={`px-4 py-2 rounded text-base ${getStatusColor(
                                app.status,
                              )}`}
                            >
                              {app.status.charAt(0).toUpperCase() +
                                app.status.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2 text-gray-600">
                        <div className="text-base md:hidden font-semibold text-gray-600 mb-1.5">
                          Date
                        </div>
                        <div className="flex items-center gap-1.5">
                          {app.dateApplied ? (
                            <>
                              <Calendar className="w-6 h-6 text-gray-400" />
                              {new Date(app.dateApplied).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-1 flex items-center gap-2 justify-end ml-auto pr-6">
                        {app.url && (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600"
                            title="Open job posting"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        <Link
                          href={`/form/${app.id}`}
                          className="text-gray-600 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(app.id)}
                            className="text-gray-600 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
