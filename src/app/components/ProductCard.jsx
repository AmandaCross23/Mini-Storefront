'use client';

import React from 'react';

export default function ProductCard({ product, addToCart }) {
  const outOfStock = product.stock <= 0;

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-medium">${product.price.toFixed(2)}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          {outOfStock ? (
            <span className="text-red-600 font-semibold">Out of stock</span>
          ) : (
            <span className="text-green-600">In stock: {product.stock}</span>
          )}
        </div>

        <button
          onClick={() => addToCart(product.id)}
          disabled={outOfStock}
          className={`px-3 py-1 rounded text-white ${outOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Add
        </button>
      </div>
    </div>
  );
}
