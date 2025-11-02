'use client';

import React from 'react';

export default function PriceFilter({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Max price</label>
      <input
        type="number"
        min="0"
        placeholder="e.g. 200"
        className="w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
