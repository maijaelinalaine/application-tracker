"use client";

import { Bell, ExternalLink, Edit, Trash2 } from "lucide-react";
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

interface DashboardProps {
  applications: Application[];
  onDelete?: (id: number) => void;
}

export default function Dashboard({ applications, onDelete }: DashboardProps) {
  const totalApps = applications.length;

  // Get upcoming deadlines
  const today = new Date();
  const upcomingDeadlines = applications
    .filter((app) => app.status === "apply" && app.dateApplied)
    .filter((app) => new Date(app.dateApplied!) > today)
    .sort(
      (a, b) =>
        new Date(a.dateApplied!).getTime() - new Date(b.dateApplied!).getTime()
    );

  // Get tasks/reminders (applications that need action)
  const tasks = [
    ...applications
      .filter((app) => app.status === "apply" && app.dateApplied)
      .filter((app) => new Date(app.dateApplied!) > today)
      .slice(0, 3)
      .map((app) => ({
        id: app.id,
        title: `Apply to ${app.company}`,
        description: `Deadline for ${app.position} position is ${new Date(
          app.dateApplied!
        ).toLocaleDateString()}`,
        due: app.dateApplied!,
        category: "Application",
        color: "bg-purple-50",
      })),
    ...applications
      .filter((app) => app.status === "interview")
      .slice(0, 2)
      .map((app) => ({
        id: app.id,
        title: `Prepare for ${app.company} interview`,
        description: `Review and prepare for ${app.position} interview`,
        due: app.dateApplied || new Date().toISOString(),
        category: "Interview",
        color: "bg-yellow-50",
      })),
  ].slice(0, 4);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      apply: "text-gray-600 bg-gray-100",
      applied: "text-blue-600 bg-blue-100",
      assessment: "text-purple-600 bg-purple-100",
      interview: "text-orange-600 bg-orange-100",
      offer: "text-green-600 bg-green-100",
      rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Application Dashboard</h1>
        <p className="text-sm text-gray-600">
          Track and manage your job applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Reminders & Notes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Reminders & Notes</h2>
              </div>
              <button className="text-xs bg-black text-white px-3 py-1 rounded">
                + Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Keep track of important dates and tasks
            </p>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-xs text-gray-400">No tasks yet</p>
              ) : (
                tasks.map((task, idx) => (
                  <div key={idx} className={`${task.color} p-3 rounded border`}>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <div className="text-xs font-medium">{task.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {task.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <span className="px-2 py-0.5 bg-white rounded text-xs">
                            {task.category}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Due: {new Date(task.due).toLocaleDateString()}
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content - All Applications */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">All Applications</h2>
              <p className="text-xs text-gray-600">
                View and manage your job applications
              </p>
            </div>

            {/* Applications List */}
            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-xs">
                  No applications yet. Create your first one!
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="border-b pb-3 hover:bg-gray-50 px-2 py-2 rounded"
                  >
                    <div className="flex items-center gap-4 text-xs">
                      {/* Position & Notes */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">
                          {app.position}
                        </div>
                        {app.notes && (
                          <div className="text-gray-500 text-xs mt-0.5 truncate">
                            {app.notes}
                          </div>
                        )}
                      </div>

                      {/* Company */}
                      <div className="w-24 shrink-0">
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {app.company}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="w-24 shrink-0">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="w-28 shrink-0 text-gray-600 flex items-center gap-1">
                        {app.dateApplied ? (
                          <>
                            <span className="text-gray-400">📅</span>
                            {new Date(app.dateApplied).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {app.url && (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600"
                            title="Open job posting"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/form/${app.id}`}
                          className="text-gray-600 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(app.id)}
                            className="text-gray-600 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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
