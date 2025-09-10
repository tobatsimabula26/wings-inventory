// src/components/Dashboard.js
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import TransactionLog from './TransactionLog';
import SalesModule from './SalesModule';
import CustomerModule from './CustomerModule';
import ReportingModule from './ReportingModule';
import Inventory from './Inventory';
import Navbar from './NavBar';

const Dashboard = ({
  products,
  onAdd,
  onUpdate,
  onDelete,
  onSell,
  onRestock,
  transactions
}) => {
  const [view, setView] = useState('dashboard');

  /* ---------- KPI helpers ---------- */
  const totalProducts = products.length;
  const lowStockItems = products.filter(p => p.quantity < 10).length;
  const totalItemsSold = transactions
    .filter(t => t.action === 'Sold')
    .reduce((sum, t) => sum + t.quantity, 0);
  const totalRevenueEstimate = transactions
    .filter(t => t.action === 'Sold')
    .reduce((sum, t) => {
      const product = products.find(p => p.id === t.productId);
      return sum + (product ? product.price * t.quantity : 0);
    }, 0);

  /* ---------- styles ---------- */
  const css = {
    page: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: 'var(--text)',
      background: 'var(--bg)',
      minHeight: '100vh'
    },
    hdr: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '28px',
      fontWeight: 700,
      margin: '0 0 4px',
      letterSpacing: '-.5px'
    },
    sub: {
      fontSize: '15px',
      color: 'var(--text-dim)',
      margin: '0 0 24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      margin: '24px 0'
    },
    card: accent => ({
      background: 'var(--surface)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      transition: '.2s',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      ':hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-md)' }
    }),
    accent: accent => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      background: accent
    }),
    kpi: {
      fontFamily: '"Roboto Mono", monospace',
      fontSize: '32px',
      fontWeight: 700,
      margin: '8px 0 0',
      letterSpacing: '-1px'
    },
    section: {
      marginTop: '40px'
    },
    btnRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginTop: '16px'
    },
    btn: (bg, glow) => ({
      padding: '12px 20px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 600,
      background: bg,
      color: '#fff',
      cursor: 'pointer',
      transition: '.2s',
      boxShadow: `0 4px 20px -4px ${glow}`
    })
  };

  /* ---------- render ---------- */
  return (
    <div>
      <Navbar active={view} setActive={setView} />

      <div style={css.page}>
        {view === 'dashboard' && (
          <div>
            <h2 style={css.hdr}>📊 Wings Cafe Dashboard</h2>
            <p style={css.sub}>Real-time overview of your inventory & sales</p>

            {/* KPI Cards */}
            <div style={css.grid}>
              <div style={css.card('#6366f1')}>
                <div style={css.accent('#6366f1')} />
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-dim)' }}>Total Products</h3>
                <p style={{ ...css.kpi, color: '#6366f1' }}>{totalProducts}</p>
              </div>

              <div style={css.card('#f59e0b')}>
                <div style={css.accent('#f59e0b')} />
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-dim)' }}>Low Stock</h3>
                <p style={{ ...css.kpi, color: '#f59e0b' }}>{lowStockItems}</p>
              </div>

              <div style={css.card('#10b981')}>
                <div style={css.accent('#10b981')} />
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-dim)' }}>Est. Revenue</h3>
                <p style={{ ...css.kpi, color: '#10b981' }}>R{totalRevenueEstimate.toFixed(2)}</p>
              </div>

              <div style={css.card('#8b5cf6')}>
                <div style={css.accent('#8b5cf6')} />
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-dim)' }}>Items Sold</h3>
                <p style={{ ...css.kpi, color: '#8b5cf6' }}>{totalItemsSold}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={css.section}>
              <h3 style={{ ...css.hdr, fontSize: '20px' }}>⚡ Quick Actions</h3>
              <div style={css.btnRow}>
                <button style={css.btn('#6366f1', '#6366f144')} onClick={() => setView('add')}>
                  ➕ Add Product
                </button>
                <button style={css.btn('#64748b', '#64748b44')} onClick={() => setView('inventory')}>
                  📋 Manage Inventory
                </button>
                <button style={css.btn('#10b981', '#10b98144')} onClick={() => setView('sales')}>
                  💰 Register Sale
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- routed views ---------- */}
        {view === 'inventory' && (
          <Inventory products={products} onDelete={onDelete} onUpdate={onUpdate} onSell={onSell} onRestock={onRestock} />
        )}
        {view === 'add' && <ProductForm onSubmit={onAdd} product={{}} title="Add New Product" />}
        {view === 'sales' && <SalesModule products={products} transactions={transactions} onSell={onSell} />}
        {view === 'logs' && <TransactionLog transactions={transactions} />}
        {view === 'customer' && <CustomerModule />}
        {view === 'reporting' && <ReportingModule />}
      </div>

      {/* ------ CSS variables ------ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&family=Roboto+Mono&display=swap');
        :root {
          --primary: #6366f1;
          --primary-light: #818cf8;
          --bg: #f8fafc;
          --surface: #ffffff;
          --input-bg: #f1f5f9;
          --border: #e2e8f0;
          --border-light: #f1f5f9;
          --text: #1e293b;
          --text-dim: #64748b;
          --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 8px 20px -4px rgb(0 0 0 / 0.08);
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

export default Dashboard;