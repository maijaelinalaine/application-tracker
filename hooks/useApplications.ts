import { useEffect, useState } from "react";

export interface Application {
  id: number;
  position: string;
  company: string;
  dateApplied: string | null;
  status: string;
  notes: string | null;
  url: string | null;
  createdAt: string;
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      if (!res.ok) throw await res.json();
      const data: Application[] = await res.json();
      setApplications(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createApplication = async (payload: Partial<Application>) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await res.json();
    const created: Application = await res.json();
    setApplications((s) => [created, ...s]);
    return created;
  };

  const updateApplication = async (
    id: number,
    payload: Partial<Application>
  ) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await res.json();
    const updated: Application = await res.json();
    setApplications((s) => s.map((a) => (a.id === updated.id ? updated : a)));
    return updated;
  };

  // optimistic delete with rollback
  const deleteApplication = async (id: number) => {
    const prev = applications;
    setApplications((s) => s.filter((a) => a.id !== id));
    const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setApplications(prev); // rollback
      throw await res.json();
    }
    return true;
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchAll,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}
