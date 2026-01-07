"use client";

import { useForm } from "@/hooks/useForm";
export default function Form() {
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

    console.log("Submitting form data:", formData); // Log what we're sending

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status); // Log the status

      if (!res.ok) {
        const err = await res.json();
        console.error("create failed", err);
        console.error("Status:", res.status);
        return;
      }

      const created = await res.json();
      console.log("created", created);
      handleReset();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg md:w-1/3 bg-white p-8 rounded-lg shadow flex flex-col gap-3"
      >
        <h1 className="text-l font-semibold text-center mb-4">
          New Application
        </h1>
        <label htmlFor="position" className="text-sm mb-0.5 font-medium">
          Position
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className="border border-gray-400"
        />
        <label htmlFor="company" className="text-sm mb-0.5 font-medium">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-400"
        />
        <label htmlFor="status" className="text-sm mb-0.5 font-medium">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-400"
        >
          <option value="">Select a status</option>
          <option value="apply">Apply</option>
          <option value="applied">Applied</option>
          <option value="assessment">Assessment</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <label htmlFor="appliedDate" className="text-sm mb-0.5 font-medium">
          Date applied
        </label>
        <input
          type="date"
          name="dateApplied"
          id="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="border border-gray-400"
        />

        <label htmlFor="url" className="text-sm mb-0.5 font-medium">
          Job Posting URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={formData.url}
          onChange={handleChange}
          className="border border-gray-400"
        />
        <label htmlFor="notes" className="text-sm mb-0.5 font-medium">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border border-gray-400 h-24 resize-none"
        />
        <button type="submit" className="border border-gray-500">
          Create
        </button>
      </form>
    </div>
  );
}
