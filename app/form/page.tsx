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

  const getDateFieldProps = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (formData.status) {
      case "apply":
        return {
          label: "Apply by (deadline)",
          min: today,
          max: undefined,
        };
      case "applied":
        return {
          label: "Date applied",
          min: undefined,
          max: today,
        };
      case "assessment":
        return {
          label: "Assessment due",
          min: today,
          max: undefined,
        };
      case "interview":
        return {
          label: "Interview date",
          min: today,
          max: undefined,
        };
      case "offer":
        return {
          label: "Offer date",
          min: undefined,
          max: undefined,
        };
      case "rejected":
        return {
          label: "Rejection date",
          min: undefined,
          max: today,
        };
      default:
        return {
          label: "Date applied",
          min: undefined,
          max: undefined,
        };
    }
  };

  const dateFieldProps = getDateFieldProps();

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-md border flex flex-col gap-3"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold">New Application</h1>
          <p className="text-base text-gray-600">
            Add a new job application to your tracker
          </p>
        </div>

        <label htmlFor="position" className="text-base font-semibold">
          Position*
        </label>
        <input
          required
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className="border border-gray-400 text-base px-4 py-2.5 rounded"
        />

        <label htmlFor="company" className="text-base font-semibold">
          Company*
        </label>
        <input
          required
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-400 text-base px-4 py-2.5 rounded"
        />

        <label htmlFor="status" className="text-base font-semibold">
          Status*
        </label>
        <select
          required
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-400 text-base px-4 py-2.5 rounded"
        >
          <option value="">Select a status</option>
          <option value="apply">Apply</option>
          <option value="applied">Applied</option>
          <option value="assessment">Assessment</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <label htmlFor="dateApplied" className="text-base font-semibold">
          {dateFieldProps.label}
        </label>
        <input
          type="date"
          name="dateApplied"
          id="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          min={dateFieldProps.min}
          max={dateFieldProps.max}
          className="border border-gray-400 text-base px-4 py-2.5 rounded"
        />

        <label htmlFor="url" className="text-base font-semibold">
          Job Posting URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={formData.url}
          onChange={handleChange}
          className="border border-gray-400 text-base px-4 py-2.5 rounded"
        />

        <label htmlFor="notes" className="text-base font-semibold">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border border-gray-400 text-base px-4 py-2.5 rounded h-24 resize-none"
        />

        <button
          type="submit"
          className="border border-gray-500 text-base px-4 py-2.5 rounded mt-1"
        >
          Create
        </button>
      </form>
    </div>
  );
}
