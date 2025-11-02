'use client';

import React from 'react';

export default function CartSummary({ itemCount, totalPrice, onDecrement, onReset, cartItems = [] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Cart</h3>
      <p className="text-sm text-gray-600">Items: <span className="font-medium">{itemCount}</span></p>
      <p className="text-sm text-gray-600">Total: <span className="font-medium">${totalPrice.toFixed(2)}</span></p>

      <div className="mt-3 space-y-2">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Empty Cart</p>
        ) : (
          cartItems.map((it) => (
            <div key={it.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="text-sm font-medium">{it.product?.name || it.id}</div>
                <div className="text-xs text-gray-500">Qty: {it.qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecrement(it.id)}
                  className="text-sm px-2 py-1 bg-yellow-400 rounded"
                >
                  -1
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={onReset}
          className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Reset Cart
        </button>
      </div>
    </div>
  );
}
