import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    handleChange,
    handleReset,
    setFormData,
  };
};
