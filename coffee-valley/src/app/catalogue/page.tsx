"use client";
import { beans } from "@/utils/dummyData";

export default function CataloguePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Coffee Bean Catalogue</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-amber-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price/Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {beans.map((bean, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border px-4 py-2">{bean.name}</td>
                <td className="border px-4 py-2">{bean.description}</td>
                <td className="border px-4 py-2">
                  ${bean.salePrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
