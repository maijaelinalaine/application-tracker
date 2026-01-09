"use client";

import { useForm } from "@/hooks/useForm";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  const { formData, handleChange, handleReset } = useForm({
    position: "",
    company: "",
    dateApplied: "",
    status: "",
    notes: "",
    url: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const err = await res.json();
        console.error("create failed", err);
        console.error("Status:", res.status);
        return;
      }

      const created = await res.json();
      console.log("created", created);
      handleReset();

      router.push("/");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-4 rounded-lg shadow flex flex-col gap-2"
      >
        <h1 className="text-sm font-semibold text-center mb-2">
          New Application
        </h1>
        <label htmlFor="position" className="text-xs mb-0.5 font-medium">
          Position
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className="border border-gray-400 text-xs p-1"
        />
        <label htmlFor="company" className="text-xs mb-0.5 font-medium">
          Company
        </label>
        <input
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
          Create
        </button>
      </form>
    </div>
  );
}
