"use client";

import { useForm } from "@/hooks/useForm";

export default function Form() {
  const { formData, handleChange, handleReset } = useForm({
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    handleReset();
  };

  return (
    <div>
      <div>New application</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-400"
        />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
          className="border border-gray-400"
        />
        <button type="submit" className="border border-gray-500">
          Create
        </button>
      </form>
    </div>
  );
}
