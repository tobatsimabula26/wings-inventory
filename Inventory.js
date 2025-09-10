// src/components/Inventory.js
import React, { useState } from 'react';

const Inventory = ({ products, onDelete, onUpdate, onSell, onRestock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [view, setView] = useState('grid');

  /* ---------- helpers ---------- */
  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return a.quantity - b.quantity;
      return 0;
    });

  const getStockStatus = qty => {
    if (qty < 5) return { label: 'Critical', color: 'var(--red)' };
    if (qty < 10) return { label: 'Low', color: 'var(--orange)' };
    if (qty < 20) return { label: 'Medium', color: 'var(--yellow)' };
    return { label: 'Healthy', color: 'var(--green)' };
  };

  /* ---------- styles ---------- */
  const css = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    card: {
      background: 'var(--surface)',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: 'var(--shadow)'
    },
    toolbar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '24px',
      alignItems: 'center'
    },
    search: {
      flex: '1 1 220px',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      fontSize: '14px',
      background: 'var(--input-bg)',
      color: 'var(--text)'
    },
    select: {
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      background: 'var(--input-bg)',
      color: 'var(--text)',
      cursor: 'pointer'
    },
    viewToggle: {
      display: 'flex',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid var(--border)'
    },
    toggleBtn: active => ({
      padding: '8px 14px',
      border: 'none',
      background: active ? 'var(--primary)' : 'transparent',
      color: active ? '#fff' : 'var(--text)',
      cursor: 'pointer',
      transition: '.2s'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '16px'
    },
    productCard: color => ({
      background: 'var(--card)',
      border: `1px solid ${color}22`,
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
      transition: 'transform .2s, box-shadow .2s',
      boxShadow: 'var(--shadow-sm)'
    }),
    badge: color => ({
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: color,
      color: '#fff',
      fontSize: '12px',
      padding: '4px 10px',
      borderRadius: '999px'
    }),
    btnRow: { display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' },
    btn: (bg, hover) => ({
      background: bg,
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: '.2s',
      ':hover': { background: hover }
    }),
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    th: {
      padding: '12px 8px',
      textAlign: 'left',
      fontSize: '14px',
      color: 'var(--text-dim)',
      borderBottom: '1px solid var(--border)'
    },
    td: {
      padding: '12px 8px',
      fontSize: '14px',
      borderBottom: '1px solid var(--border-light)'
    },
    summary: {
      marginTop: '24px',
      padding: '14px 18px',
      background: 'var(--highlight)',
      borderRadius: '8px',
      fontSize: '14px'
    }
  };

  /* ---------- render ---------- */
  return (
    <div style={css.container}>
      <div style={css.card}>
        <h2 style={{ margin: '0 0 8px', fontSize: '22px' }}>📦 Inventory</h2>
        <p style={{ margin: '0 0 20px', color: 'var(--text-dim)' }}>
          View, manage, and monitor every product in stock.
        </p>

        {/* ------- toolbar ------- */}
        <div style={css.toolbar}>
          <input
            type="text"
            placeholder="🔍 Search products…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={css.search}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={css.select}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>

          <div style={css.viewToggle}>
            <button style={css.toggleBtn(view === 'grid')} onClick={() => setView('grid')}>Grid</button>
            <button style={css.toggleBtn(view === 'table')} onClick={() => setView('table')}>Table</button>
          </div>
        </div>

        {/* ------- grid ------- */}
        {view === 'grid' && (
          <div style={css.grid}>
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                No products match your search.
              </div>
            )}
            {filteredProducts.map(p => {
              const status = getStockStatus(p.quantity);
              return (
                <div
                  key={p.id}
                  style={css.productCard(status.color)}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div style={css.badge(status.color)}>{p.quantity}</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px' }}>{p.name}</h4>
                  <div style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '6px' }}>
                    {p.category}
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>R{p.price.toFixed(2)}</div>
                  <div style={{ fontSize: '13px', color: status.color, fontWeight: 500, marginBottom: '10px' }}>
                    {status.label}
                  </div>

                  <div style={css.btnRow}>
                    <button
                      onClick={() => onSell(p.id, 1)}
                      style={css.btn('var(--green)', 'var(--green-hover)')}
                    >
                      ➖ Sell
                    </button>
                    <button
                      onClick={() => onRestock(p.id, 5)}
                      style={css.btn('var(--yellow)', 'var(--yellow-hover)')}
                    >
                      ➕ +5
                    </button>
                    <button
                      onClick={() => onUpdate(p)}
                      style={css.btn('var(--primary)', 'var(--primary-hover)')}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      style={css.btn('var(--red)', 'var(--red-hover)')}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ------- table ------- */}
        {view === 'table' && (
          <table style={css.table}>
            <thead>
              <tr>
                <th style={css.th}>Product</th>
                <th style={css.th}>Category</th>
                <th style={css.th}>Price</th>
                <th style={css.th}>Stock</th>
                <th style={css.th}>Status</th>
                <th style={css.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => {
                const status = getStockStatus(p.quantity);
                return (
                  <tr key={p.id}>
                    <td style={css.td}><strong>{p.name}</strong></td>
                    <td style={css.td}>
                      <span style={{
                        background: 'var(--tag-bg)',
                        color: 'var(--tag-text)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '12px'
                      }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={css.td}>R{p.price.toFixed(2)}</td>
                    <td style={css.td}>{p.quantity}</td>
                    <td style={{ ...css.td, color: status.color, fontWeight: 500 }}>
                      {status.label}
                    </td>
                    <td style={css.td}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => onSell(p.id, 1)} style={css.btn('var(--green)', 'var(--green-hover)')}>➖</button>
                        <button onClick={() => onRestock(p.id, 5)} style={css.btn('var(--yellow)', 'var(--yellow-hover)')}>➕</button>
                        <button onClick={() => onUpdate(p)} style={css.btn('var(--primary)', 'var(--primary-hover)')}>✏️</button>
                        <button onClick={() => onDelete(p.id)} style={css.btn('var(--red)', 'var(--red-hover)')}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* ------- summary ------- */}
        <div style={css.summary}>
          📊 Showing <strong>{filteredProducts.length}</strong> products ·
          <span style={{ color: 'var(--red)' }}>
            {' '}{filteredProducts.filter(p => p.quantity < 10).length} low stock
          </span>
        </div>
      </div>

      {/* ------- CSS variables (optional) ------- */}
      <style>{`
        :root {
          --primary: #3b82f6;
          --primary-hover: #2563eb;
          --green: #10b981;
          --green-hover: #059669;
          --yellow: #f59e0b;
          --yellow-hover: #d97706;
          --red: #ef4444;
          --red-hover: #dc2626;
          --orange: #f97316;
          --text: #111827;
          --text-dim: #6b7280;
          --surface: #ffffff;
          --card: #ffffff;
          --input-bg: #f3f4f6;
          --border: #e5e7eb;
          --border-light: #f3f4f6;
          --tag-bg: #e0f2fe;
          --tag-text: #0369a1;
          --highlight: #eff6ff;
          --shadow: 0 4px 12px rgba(0,0,0,.06);
          --shadow-sm: 0 1px 3px rgba(0,0,0,.05);
          --shadow-md: 0 8px 20px rgba(0,0,0,.08);
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --text: #f9fafb;
            --text-dim: #9ca3af;
            --surface: #111827;
            --card: #1f2937;
            --input-bg: #374151;
            --border: #374151;
            --border-light: #4b5563;
            --tag-bg: #1e3a8a;
            --tag-text: #93c5fd;
            --highlight: #1e3a8a22;
          }
        }
      `}</style>
    </div>
  );
};

export default Inventory;