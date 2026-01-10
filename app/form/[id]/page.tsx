"use client";

import { useForm } from "@/hooks/useForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useApplications } from "@/hooks/useApplications";

export default function EditForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const appId = parseInt(id);
  const { formData, handleChange, handleReset, setFormData } = useForm({
    position: "",
    company: "",
    dateApplied: "",
    status: "",
    notes: "",
    url: "",
  });
  const [loading, setLoading] = useState(true);
  const { applications, updateApplication } = useApplications();

  useEffect(() => {
    if (!id) return;

    // try to use in-memory data first
    const found = applications.find((a) => a.id === appId);
    if (found) {
      setFormData({
        position: found.position,
        company: found.company,
        status: found.status,
        notes: found.notes ?? "",
        url: found.url ?? "",
        dateApplied: found.dateApplied
          ? new Date(found.dateApplied).toISOString().split("T")[0]
          : "",
      });
      setLoading(false);
      return;
    }

    // fallback to fetching single item
    const fetchApp = async () => {
      try {
        const res = await fetch(`/api/applications/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            position: data.position,
            company: data.company,
            status: data.status,
            notes: data.notes ?? "",
            url: data.url ?? "",
            dateApplied: data.dateApplied
              ? new Date(data.dateApplied).toISOString().split("T")[0]
              : "",
          });
        } else {
          console.error(
            "Failed to fetch application for edit",
            await res.text()
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id, setFormData, applications]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateApplication(appId, formData);
      router.push("/");
    } catch (err) {
      console.error("Update failed:", err);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-4 rounded-lg shadow flex flex-col gap-2"
      >
        <h1 className="text-sm font-semibold text-center mb-2">
          Edit Application
        </h1>
        <label htmlFor="position" className="text-xs mb-0.5 font-medium">
          Position*
        </label>
        <input
          required
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        />
        <label htmlFor="company" className="text-xs mb-0.5 font-medium">
          Company*
        </label>
        <input
          required
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        />
        <label htmlFor="status" className="text-xs mb-0.5 font-medium">
          Status
        </label>
        <select
          required
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        >
          <option value="">Select a status</option>
          <option value="apply">Apply</option>
          <option value="applied">Applied</option>
          <option value="assessment">Assessment</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <label htmlFor="dateApplied" className="text-xs mb-0.5 font-medium">
          Date applied
        </label>
        <input
          type="date"
          name="dateApplied"
          id="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        />
        <label htmlFor="url" className="text-xs mb-0.5 font-medium">
          Job Posting URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={formData.url}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        />
        <label htmlFor="notes" className="text-xs mb-0.5 font-medium">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1 h-16 resize-none"
        />
        <button
          type="submit"
          className="border border-gray-500 text-xs p-1 mt-1"
        >
          Update
        </button>
      </form>
    </div>
  );
}
