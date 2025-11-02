'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ProductList from './ProductList';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
        setFiltered(data);
        const cats = Array.from(new Set(data.map((p) => p.category)));
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Error fetching');
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let f = [...products];
    if (selectedCategory && selectedCategory !== 'All') {
      f = f.filter((p) => p.category === selectedCategory);
    }
    if (maxPrice !== '') {
      const priceNum = Number(maxPrice);
      if (!Number.isNaN(priceNum)) {
        f = f.filter((p) => p.price <= priceNum);
      }
    }
    setFiltered(f);
  }, [products, selectedCategory, maxPrice]);

  useEffect(() => {
    const id = setInterval(() => {
      setProducts((prev) => {
        if (prev.length === 0) return prev;
        // pick random product
        const idx = Math.floor(Math.random() * prev.length);
        const picked = prev[idx];
        // 60% chance to change stock
        if (Math.random() < 0.6 && picked.stock > 0) {
          // immutably update products
          const next = prev.map((p, i) =>
            i === idx ? { p, stock: Math.max(0, p.stock - 1) } : p
          );
          return next;
        }
        return prev;
      });
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const addToCart = useCallback((productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
    );

    setCart((prev) => {
      const next = { prev };
      next[productId] = (next[productId] || 0) + 1;
      return next;
    });
  }, []);

  const decrementFromCart = useCallback((productId) => {
    setCart((prev) => {
      const next = { prev };
      if (!next[productId]) return prev;
      next[productId] -= 1;
      if (next[productId] <= 0) delete next[productId];
      return next;
    });

    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p)));
  }, []);

  const resetCart = useCallback(() => {
    setProducts((prev) => {
      const copy = prev.map((p) => ({ ...p }));
      Object.entries(cart).forEach(([pid, qty]) => {
        const idx = copy.findIndex((pp) => pp.id === pid);
        if (idx !== -1) copy[idx].stock += qty;
      });
      return copy;
    });
    setCart({});
  }, [cart]);

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p.id === id);
    return { id, qty, product };
  });

  const itemCount = cartItems.reduce((s, it) => s + it.qty, 0);
  const totalPrice = cartItems.reduce((s, it) => s + (it.product ? it.product.price * it.qty : 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 bg-white p-4 rounded-md shadow">
        <h2 className="font-semibold mb-3">Filters</h2>
        <CategoryFilter
          categories={['All', categories]}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        <div className="mt-6">
          <CartSummary
            itemCount={itemCount}
            totalPrice={totalPrice}
            onDecrement={decrementFromCart}
            onReset={resetCart}
            cartItems={cartItems}
          />
        </div>
      </aside>

      <section className="lg:col-span-3">
        <StatusMessage loading={loading} error={error} products={filtered} />
        {!loading && !error && (
          <ProductList products={filtered} addToCart={addToCart} />
        )}
      </section>
    </div>
  );
}
