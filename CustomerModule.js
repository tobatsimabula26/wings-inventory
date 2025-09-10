// src/components/CustomerModule.js
import React, { useState } from 'react';

const CustomerModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Customer Data (filled with realistic entries)
  const customers = [
    {
      id: 1,
      name: 'Lerato Mokoena',
      email: 'lerato.mokoena@email.com',
      phone: '+266 5812 3456',
      membership: 'Gold',
      totalOrders: 24,
      lastOrder: '2025-09-04',
      favorite: 'Chicken Wings'
    },
    {
      id: 2,
      name: 'Thabo Nkosi',
      email: 'thabo.nkosi@email.com',
      phone: '+266 6011 7890',
      membership: 'Standard',
      totalOrders: 8,
      lastOrder: '2025-08-28',
      favorite: 'Garlic Bread'
    },
    {
      id: 3,
      name: 'Nthabeleng Phiri',
      email: 'nthabeleng.phiri@email.com',
      phone: '+266 5533 1122',
      membership: 'Platinum',
      totalOrders: 41,
      lastOrder: '2025-09-05',
      favorite: 'Coca Cola'
    },
    {
      id: 4,
      name: 'Mpho Letsoela',
      email: 'mpho.letsoela@email.com',
      phone: '+266 6244 5566',
      membership: 'Gold',
      totalOrders: 19,
      lastOrder: '2025-09-02',
      favorite: 'Buffalo Wings'
    },
    {
      id: 5,
      name: 'David Motsoeneng',
      email: 'david.motsoeneng@email.com',
      phone: '+266 5977 8899',
      membership: 'Standard',
      totalOrders: 5,
      lastOrder: '2025-08-20',
      favorite: 'Water Bottle'
    },
    {
      id: 6,
      name: 'Annie Lebone',
      email: 'annie.lebone@email.com',
      phone: '+266 6122 3344',
      membership: 'Platinum',
      totalOrders: 33,
      lastOrder: '2025-09-04',
      favorite: 'Chicken Wings'
    },
    {
      id: 7,
      name: 'Kagiso Tlhabi',
      email: 'kagiso.tlhabi@email.com',
      phone: '+266 5688 7766',
      membership: 'Standard',
      totalOrders: 12,
      lastOrder: '2025-08-30',
      favorite: 'Coca Cola'
    },
    {
      id: 8,
      name: 'Refiloe Maimela',
      email: 'refiloe.maimela@email.com',
      phone: '+266 6099 0011',
      membership: 'Gold',
      totalOrders: 17,
      lastOrder: '2025-09-01',
      favorite: 'Garlic Bread'
    }
  ];

  // Filter customers by search term
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  // Get badge color based on membership
  const getMembershipColor = (level) => {
    switch (level) {
      case 'Platinum': return '#e74c3c'; // Red
      case 'Gold': return '#f39c12';     // Orange
      case 'Standard': return '#95a5a6'; // Gray
      default: return '#bdc3c7';
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>👥 Customer Management</h2>
        <p>
          Manage customer profiles, track order history, and identify loyal patrons.
        </p>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Customer Table */}
        {filteredCustomers.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>No customers match your search.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Membership</th>
                <th>Orders</th>
                <th>Last Order</th>
                <th>Favorite Item</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>
                    <div>{c.email}</div>
                    <div style={{ color: '#7f8c8d', fontSize: '12px' }}>{c.phone}</div>
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: getMembershipColor(c.membership),
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {c.membership}
                    </span>
                  </td>
                  <td>{c.totalOrders}</td>
                  <td>{new Date(c.lastOrder).toLocaleDateString()}</td>
                  <td>
                    <em>{c.favorite}</em>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Summary Stats */}
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          fontSize: '14px'
        }}>
          <strong>📊 Customer Summary:</strong> {filteredCustomers.length} customers |&nbsp;
          <span style={{ color: '#e74c3c' }}>
            {customers.filter(c => c.membership === 'Platinum').length} Platinum
          </span> |&nbsp;
          <span style={{ color: '#f39c12' }}>
            {customers.filter(c => c.membership === 'Gold').length} Gold
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerModule;