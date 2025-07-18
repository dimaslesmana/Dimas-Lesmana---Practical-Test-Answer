"use client";
import { useState, useEffect } from "react";

type Distributor = {
  id?: number;
  name: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

type Props = {
  initial?: Distributor;
  onSave: (data: Distributor) => void;
  onCancel?: () => void;
};

export default function DistributorForm({ initial, onSave, onCancel }: Props) {
  const [data, setData] = useState<Distributor>(
    initial || {
      name: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
    }
  );
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    if (!data.name || !data.city || !data.email) {
      return "Name, City, and Email are required.";
    }
    if (!data.email.includes("@")) return "Invalid email format.";
    if (data.phone && !/^[0-9+\\-]+$/.test(data.phone))
      return "Invalid phone format.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) return setError(errorMsg);
    onSave(data);
    setData({
      name: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
    });
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-3 bg-white p-4 rounded shadow mt-4"
    >
      {error && <p className="col-span-2 text-red-600 text-sm">{error}</p>}
      {["name", "city", "state", "country", "phone", "email"].map((field) => (
        <input
          key={field}
          name={field}
          value={(data as any)[field]}
          onChange={handleChange}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className="border p-2"
        />
      ))}
      <button type="submit" className="col-span-2 bg-green-700 text-white py-2">
        Save
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="col-span-2 text-sm text-gray-500 underline"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
