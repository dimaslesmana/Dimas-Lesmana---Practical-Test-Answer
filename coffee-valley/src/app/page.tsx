"use client";

import React, { useState } from "react";
import { format } from "date-fns";

const users = [{ userId: "admin", password: "admin" }];
const beans = [
  {
    name: "Arabica Classic",
    description: "Smooth and flavorful.",
    price: 12.5,
  },
  { name: "Robusta Bold", description: "Strong and intense.", price: 9.75 },
  {
    name: "House Blend",
    description: "Balanced with rich aroma.",
    price: 11.0,
  },
];

export default function Home() {
  const [session, setSession] = useState<string | null>(null);
  const [page, setPage] = useState("login");

  const [distributors, setDistributors] = useState([
    {
      id: 1,
      name: "Global Beans Co.",
      city: "Jakarta",
      state: "DKI",
      country: "Indonesia",
      phone: "021123456",
      email: "global@beans.com",
    },
    {
      id: 2,
      name: "Coffee Traders Ltd.",
      city: "Bandung",
      state: "Jabar",
      country: "Indonesia",
      phone: "022789456",
      email: "traders@coffee.com",
    },
  ]);
  const [form, setForm] = useState({
    id: 0,
    name: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const login = (id: string, password: string) => {
    const user = users.find((u) => u.userId === id && u.password === password);
    if (user) {
      setSession(id);
      setPage("home");
    } else {
      alert("Invalid login");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setDistributors((prev) => prev.map((d) => (d.id === form.id ? form : d)));
      setIsEditing(false);
    } else {
      setDistributors((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({
      id: 0,
      name: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
    });
  };

  const handleEdit = (d: typeof form) => {
    setForm(d);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setDistributors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearForm = () => {
    setForm({
      id: 0,
      name: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
    });
    setIsEditing(false);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Coffee Valley Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e.currentTarget.userId.value, e.currentTarget.password.value);
          }}
          className="flex flex-col gap-2"
        >
          <input
            name="userId"
            className="border p-2"
            placeholder="User ID"
            required
          />
          <input
            name="password"
            type="password"
            className="border p-2"
            placeholder="Password"
            required
          />
          <button className="bg-black text-white px-4 py-2">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brown-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Coffee Valley</h1>
        <nav className="mt-2 space-x-4">
          {["home", "catalogue", "order", "distributors", "upload"].map((p) => (
            <button key={p} className="underline" onClick={() => setPage(p)}>
              {p[0].toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button
            className="underline ml-4 text-red-300"
            onClick={() => {
              setSession(null);
              setPage("login");
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="flex-1 p-4">
        {page === "home" && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Bean of the Day</h2>
            {beans
              .filter((b) => b.price >= 0)
              .map((bean, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-xl font-bold">{bean.name}</h3>
                  <p className="text-sm">Price: ${bean.price.toFixed(2)}</p>
                  <p>{bean.description}</p>
                </div>
              ))}
          </div>
        )}

        {page === "catalogue" && (
          <table className="table-auto border w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price/Unit</th>
              </tr>
            </thead>
            <tbody>
              {beans.map((b, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.description}</td>
                  <td className="p-2">${b.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {page === "distributors" && (
          <div>
            <h2 className="text-xl font-bold">Distributors</h2>
            <table className="table-auto border w-full mb-6">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {distributors.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-2">{d.name}</td>
                    <td className="p-2">{d.city}</td>
                    <td className="p-2 space-x-2">
                      <button
                        className="underline text-blue-600"
                        onClick={() => handleEdit(d)}
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

            <h3 className="text-lg font-semibold">
              {isEditing ? "Edit" : "Add"} Distributor
            </h3>
            <form
              className="grid grid-cols-2 gap-2 mt-2"
              onSubmit={handleAddOrUpdate}
            >
              {["name", "city", "state", "country", "phone", "email"].map(
                (field) => (
                  <input
                    key={field}
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleFormChange}
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    className="border p-2"
                    required
                  />
                )
              )}
              <div className="col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4"
                  onClick={handleClearForm}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {page === "upload" && (
          <form className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Upload Document</h2>
            <input placeholder="Title" className="border p-2" />
            <input type="file" className="border p-2" />
            <input placeholder="Author" className="border p-2" />
            <button className="bg-blue-700 text-white py-2">Submit</button>
          </form>
        )}
      </main>

      <footer className="text-center p-4">
        Today&apos;s Date: {format(new Date("2025-07-18"), "MMMM d, yyyy")}
      </footer>
    </div>
  );
}
