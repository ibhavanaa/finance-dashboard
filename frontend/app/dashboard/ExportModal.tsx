'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  filters: Record<string, string>;
  onClose: () => void;
}

const fieldOptions = [
  'id',
  'date',
  'amount',
  'category',
  'status',
  'user_id',
  'user_profile',
];

export default function ExportModal({ filters, onClose }: Props) {
  const [selectedCols, setSelectedCols] = useState<string[]>([...fieldOptions]);

  const toggleField = (field: string) => {
    setSelectedCols((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleExport = () => {
    if (selectedCols.length === 0) {
      toast.error('Please select at least one column to export.');
      return;
    }
    const query = new URLSearchParams({ ...filters }).toString();
    const columnsParam = selectedCols.join(',');
    const fullURL = `http://localhost:5000/api/transactions/export?${query}&columns=${columnsParam}`;
    window.open(fullURL, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">🧾 Export CSV Configuration</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {fieldOptions.map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCols.includes(field)}
                onChange={() => toggleField(field)}
              />
              <span className="capitalize text-sm">{field.replace('_', ' ')}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-red-500 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
