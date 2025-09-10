// src/components/TransactionLog.js
import React from 'react';

const TransactionLog = ({ transactions }) => {
  // Sort by newest first
  const logs = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Format date nicely
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get icon and color based on action
  const getActionConfig = (action) => {
    switch (action) {
      case 'Sold':
        return { icon: '🔻', color: '#e74c3c', label: 'Sale' };
      case 'Restocked':
        return { icon: '🔺', color: '#27ae60', label: 'Restock' };
      default:
        return { icon: '📦', color: '#3498db', label: action };
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📦 Transaction & Stock Log</h2>
        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
          Track all inventory changes in real time. Sales and restocking events are logged automatically.
        </p>

        {logs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            color: '#6c757d',
            fontStyle: 'italic'
          }}>
            <span style={{ fontSize: '48px', marginBottom: '10px' }}>📋</span>
            <p>No transactions recorded yet.</p>
            <small>Start selling or restocking to see logs here.</small>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {logs.map((log, index) => {
              const { icon, color, label } = getActionConfig(log.action);
              return (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 1fr 1fr auto',
                    alignItems: 'center',
                    padding: '14px 16px',
                    border: `1px solid ${color}22`,
                    borderRadius: '10px',
                    backgroundColor: `${color}08`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.01)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Action Icon */}
                  <div style={{
                    fontSize: '24px',
                    textAlign: 'center'
                  }}>
                    {icon}
                  </div>

                  {/* Product Name */}
                  <div>
                    <strong style={{ fontSize: '15px', color: '#2c3e50' }}>{log.productName}</strong>
                    <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                      ID: {log.productId}
                    </div>
                  </div>

                  {/* Action Type */}
                  <div>
                    <span style={{
                      backgroundColor: color,
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {label}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div style={{
                    fontWeight: 'bold',
                    color: log.action === 'Sold' ? '#e74c3c' : '#27ae60'
                  }}>
                    {log.quantity} units
                  </div>

                  {/* Timestamp */}
                  <div style={{
                    fontSize: '12px',
                    color: '#7f8c8d',
                    textAlign: 'right'
                  }}>
                    {formatDate(log.timestamp)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f1f8ff',
          borderRadius: '8px',
          border: '1px solid #d0e6ff'
        }}>
          <h4>📊 Summary</h4>
          <p>
            <strong>Total Transactions:</strong> {logs.length} |&nbsp;
            <strong>Sales:</strong> {logs.filter(t => t.action === 'Sold').length} |&nbsp;
            <strong>Restocks:</strong> {logs.filter(t => t.action === 'Restocked').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionLog;