// src/components/SalesModule.js
import React, { useState } from 'react';

const SalesModule = ({ products, transactions, onSell }) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const availableProducts = products.filter(p => p.quantity > 0);

  const handleSell = () => {
    if (!selectedProductId || quantity < 1) {
      setMessage('Please select a product and enter a valid quantity.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    const product = products.find(p => p.id === parseInt(selectedProductId));
    if (!product) return;

    if (quantity > product.quantity) {
      setMessage(`❌ Not enough stock! Only ${product.quantity} available.`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    onSell(parseInt(selectedProductId), quantity);
    setMessage(`✅ Sold ${quantity} × ${product.name}`);
    setTimeout(() => setMessage(''), 3000);
    setQuantity(1);
  };

  const recentSales = transactions
    .filter(t => t.action === 'Sold')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  /* ---------- styles ---------- */
  const css = {
    page: {
      padding: '2rem',
      maxWidth: '840px',
      margin: '0 auto',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: 'var(--text)',
      background: 'var(--bg)',
      minHeight: '100vh'
    },
    card: {
      background: 'var(--surface)',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border)'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      margin: '0 0 4px',
      letterSpacing: '-.4px'
    },
    sub: {
      fontSize: '14px',
      color: 'var(--text-dim)',
      margin: '0 0 24px'
    },
    msg: ok => ({
      padding: '12px 16px',
      marginBottom: '24px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 500,
      background: ok ? 'var(--green-bg)' : 'var(--red-bg)',
      color: ok ? 'var(--green-text)' : 'var(--red-text)',
      border: `1px solid ${ok ? 'var(--green-border)' : 'var(--red-border)'}`,
      transition: '.2s'
    }),
    label: {
      fontSize: '13px',
      fontWeight: 600,
      marginBottom: '6px',
      display: 'block',
      textTransform: 'uppercase',
      letterSpacing: '.5px',
      color: 'var(--text-dim)'
    },
    select: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '10px',
      border: '1px solid var(--border)',
      fontSize: '15px',
      background: 'var(--input-bg)',
      color: 'var(--text)',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: '.2s',
      ':focus': { borderColor: 'var(--primary)', outline: 'none' }
    },
    qty: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '10px',
      border: '1px solid var(--border)',
      fontSize: '15px',
      background: 'var(--input-bg)',
      color: 'var(--text)',
      marginBottom: '20px'
    },
    sellBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 600,
      background: 'var(--primary)',
      color: '#fff',
      cursor: 'pointer',
      transition: '.2s',
      boxShadow: 'var(--shadow-sm)'
    },
    tableCard: {
      marginTop: '32px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    th: {
      padding: '12px 8px',
      textAlign: 'left',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '.5px',
      color: 'var(--text-dim)',
      borderBottom: '1px solid var(--border)'
    },
    td: {
      padding: '10px 8px',
      borderBottom: '1px solid var(--border-light)'
    },
    mono: {
      fontFamily: '"Roboto Mono", monospace'
    }
  };

  return (
    <div style={css.page}>
      <div style={css.card}>
        <h2 style={css.h2}>💰 Sales Terminal</h2>
        <p style={css.sub}>Ring up sales quickly — stock updates automatically.</p>

        {message && (
          <div style={css.msg(!message.includes('❌'))}>{message}</div>
        )}

        {/* ---- form ---- */}
        <div>
          <label style={css.label}>Product</label>
          <select
            value={selectedProductId}
            onChange={e => {
              setSelectedProductId(e.target.value);
              setQuantity(1);
            }}
            style={css.select}
          >
            <option value="">-- Choose a product --</option>
            {availableProducts.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} – R{p.price.toFixed(2)} ({p.quantity} in stock)
              </option>
            ))}
          </select>

          <label style={css.label}>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            disabled={!selectedProductId}
            style={css.qty}
          />

          <button style={css.sellBtn} onClick={handleSell}>
            💰 Sell Now
          </button>
        </div>

        {/* ---- recent sales ---- */}
        <div style={css.tableCard}>
          <h3 style={{ ...css.h2, fontSize: '18px', marginBottom: '12px' }}>🕒 Recent Sales</h3>
          {recentSales.length === 0 ? (
            <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>No sales yet.</p>
          ) : (
            <table style={css.table}>
              <thead>
                <tr>
                  <th style={css.th}>Product</th>
                  <th style={css.th}>Qty</th>
                  <th style={css.th}>Total</th>
                  <th style={css.th}>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, i) => {
                  const product = products.find(p => p.id === sale.productId);
                  const total = (product ? product.price * sale.quantity : 0).toFixed(2);
                  return (
                    <tr key={i}>
                      <td style={css.td}>{sale.productName}</td>
                      <td style={css.td}>{sale.quantity}</td>
                      <td style={{ ...css.td, ...css.mono }}>R{total}</td>
                      <td style={{ ...css.td, ...css.mono }}>
                        {new Date(sale.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ------ CSS variables ------ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap');
        :root {
          --primary: #6366f1;
          --primary-hover: #4f46e5;
          --green: #10b981;
          --green-bg: #d1fae5;
          --green-border: #a7f3d0;
          --green-text: #065f46;
          --red: #ef4444;
          --red-bg: #fee2e2;
          --red-border: #fecaca;
          --red-text: #991b1b;
          --bg: #f8fafc;
          --surface: #ffffff;
          --input-bg: #f1f5f9;
          --border: #e2e8f0;
          --border-light: #f1f5f9;
          --text: #1e293b;
          --text-dim: #64748b;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0f172a;
            --surface: #1e293b;
            --input-bg: #334155;
            --border: #334155;
            --text: #f1f5f9;
            --text-dim: #94a3b8;
          }
        }
      `}</style>
    </div>
  );
};

export default SalesModule;