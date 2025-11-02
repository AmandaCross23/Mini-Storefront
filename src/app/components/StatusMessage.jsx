'use client';

import React from 'react';

export default function StatusMessage({ loading, error, products = [] }) {
  if (loading) {
    return (
      <div className="mb-4 p-4 bg-white rounded shadow">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 p-4 bg-red-50 text-red-800 rounded shadow">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded shadow">
        <p>No products match your filters.</p>
      </div>
    );
  }

  return null;
}
