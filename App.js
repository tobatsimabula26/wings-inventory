// src/App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // State for products and transactions
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Load data from localStorage on startup
  useEffect(() => {
    const savedProducts = localStorage.getItem('wings-cafe-products');
    const savedTransactions = localStorage.getItem('wings-cafe-transactions');

    if (savedProducts) {
      // Use saved products from localStorage
      setProducts(JSON.parse(savedProducts));
    } else {
      // Only try to load from JSON file if no saved data
      fetch('/data/inventory.json')
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          // Assign unique IDs if not present
          const productsWithId = data.map(p => ({
            ...p,
            id: p.id || Date.now() + Math.random()
          }));
          setProducts(productsWithId);
          // Save to localStorage so it persists
          localStorage.setItem('wings-cafe-products', JSON.stringify(productsWithId));
        })
        .catch(err => {
          console.warn("Could not load inventory.json, starting with empty inventory", err);
          setProducts([]);
        });
    }

    // Load transactions
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('wings-cafe-products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wings-cafe-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // --- Add Product ---
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Unique ID
    };
    setProducts(prev => [...prev, newProduct]);
  };

  // --- Update Product ---
  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...updatedProduct, id } : p)));
  };

  // --- Delete Product ---
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // --- Sell Product & Log Transaction ---
  const sellProduct = (id, quantitySold) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newQuantity = Math.max(p.quantity - quantitySold, 0);

          // Log the transaction
          setTransactions(prevLogs => [
            ...prevLogs,
            {
              productId: p.id,
              productName: p.name,
              action: 'Sold',
              quantity: quantitySold,
              remainingStock: newQuantity,
              timestamp: new Date().toISOString(),
            },
          ]);

          return { ...p, quantity: newQuantity };
        }
        return p;
      })
    );
  };

  // --- Restock Product & Log Transaction ---
  const restockProduct = (id, quantityAdded) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newQuantity = p.quantity + quantityAdded;

          // Log restock action
          setTransactions(prevLogs => [
            ...prevLogs,
            {
              productId: p.id,
              productName: p.name,
              action: 'Restocked',
              quantity: quantityAdded,
              remainingStock: newQuantity,
              timestamp: new Date().toISOString(),
            },
          ]);

          return { ...p, quantity: newQuantity };
        }
        return p;
      })
    );
  };

  return (
    <div className="App">
      <Dashboard
        products={products}
        onAdd={addProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
        onSell={sellProduct}
        onRestock={restockProduct}
        transactions={transactions}
      />
    </div>
  );
}

export default App;