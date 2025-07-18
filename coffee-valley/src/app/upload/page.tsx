"use client";
import { useState } from "react";

export default function UploadPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded shadow">
          File has been submitted (simulated). Thank you!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            name="title"
            placeholder="Document Title"
            required
            className="border p-2"
          />
          <input name="file" type="file" className="border p-2" required />
          <input
            name="author"
            placeholder="Author"
            required
            className="border p-2"
          />
          <button type="submit" className="bg-blue-700 text-white py-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
