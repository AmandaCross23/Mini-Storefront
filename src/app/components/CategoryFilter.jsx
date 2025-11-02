'use client';

import React from 'react';

export default function CategoryFilter({ categories = [], value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Category</label>
      <select
        className="w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
