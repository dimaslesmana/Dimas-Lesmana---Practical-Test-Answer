"use client";
import { useState } from "react";
import DistributorForm from "@/components/DistributorForm";
import { initialDistributors } from "@/utils/dummyData";

type Distributor = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

export default function DistributorsPage() {
  const [distributors, setDistributors] =
    useState<Distributor[]>(initialDistributors);
  const [editing, setEditing] = useState<Distributor | null>(null);

  const handleAdd = (data: Omit<Distributor, "id">) => {
    const newDistributor: Distributor = { ...data, id: Date.now() };
    setDistributors([...distributors, newDistributor]);
  };

  const handleUpdate = (data: Distributor) => {
    const updated = distributors.map((d) => (d.id === data.id ? data : d));
    setDistributors(updated);
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Delete this distributor?");
    if (confirm) setDistributors(distributors.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Distributors</h2>
      <table className="w-full border-collapse border mb-4">
        <thead className="bg-amber-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">City</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {distributors.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="border px-4 py-2">{d.name}</td>
              <td className="border px-4 py-2">{d.city}</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  className="underline text-blue-600"
                  onClick={() => setEditing(d)}
                >
                  Edit
                </button>
                <button
                  className="underline text-red-600"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing ? (
        <DistributorForm
          initial={editing}
          onSave={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-4">Add Distributor</h3>
          <DistributorForm onSave={handleAdd} />
        </>
      )}
    </div>
  );
}
