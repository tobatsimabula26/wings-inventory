// src/components/ProductList.js
import React, { useState } from 'react';

const ProductList = ({ products, onDelete, onUpdate, onSell, onRestock }) => {
  const [editProduct, setEditProduct] = useState(null);

  // Handle sell action
  const handleSell = (id) => {
    const quantity = prompt('Enter quantity to sell:');
    const qty = parseInt(quantity);
    if (qty && qty > 0) {
      onSell(id, qty);
    }
  };

  // Handle restock action
  const handleRestock = (id) => {
    const quantity = prompt('Enter quantity to add:');
    const qty = parseInt(quantity);
    if (qty && qty > 0) {
      onRestock(id, qty);
    }
  };

  // Handle edit form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value)
    };
    onUpdate(editProduct.id, updated);
    setEditProduct(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📋 Inventory Management</h2>
        <p>Manage your product stock, update details, and track availability.</p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                  No products available. Add one to get started.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <React.Fragment key={p.id}>
                  {editProduct?.id === p.id ? (
                    <tr style={{ backgroundColor: '#f0f8ff' }}>
                      <td colSpan="7">
                        <form onSubmit={handleUpdate} style={{ padding: '15px', border: '1px dashed #3498db', borderRadius: '8px' }}>
                          <h3>Edit Product</h3>
                          <input name="name" defaultValue={p.name} placeholder="Product Name" required className="form-control" />
                          <input name="description" defaultValue={p.description} placeholder="Description" className="form-control" />
                          <input name="category" defaultValue={p.category} placeholder="Category (e.g., Food)" className="form-control" />
                          <input name="price" type="number" step="0.01" defaultValue={p.price} placeholder="Price" required className="form-control" />
                          <input name="quantity" type="number" defaultValue={p.quantity} placeholder="Quantity" required className="form-control" />
                          <div style={{ marginTop: '10px' }}>
                            <button type="submit" className="btn-success">💾 Save</button>
                            <button type="button" onClick={() => setEditProduct(null)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>❌ Cancel</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.description}</td>
                      <td><span style={{ 
                        backgroundColor: '#e0f7fa', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '14px' 
                      }}>
                        {p.category}
                      </span></td>
                      <td>R{p.price.toFixed(2)}</td>
                      <td>{p.quantity}</td>
                      <td>
                        <span style={{
                          color: p.quantity < 10 ? 'red' : p.quantity < 20 ? 'orange' : 'green',
                          fontWeight: 'bold'
                        }}>
                          {p.quantity < 10 ? '⚠️ Low Stock' : p.quantity < 20 ? '🔶 Running Low' : '✅ In Stock'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button onClick={() => setEditProduct(p)} className="btn-primary">✏️ Edit</button>
                          <button onClick={() => onDelete(p.id)} className="btn-danger">🗑️ Delete</button>
                          <button onClick={() => handleSell(p.id)} style={{ backgroundColor: '#28a745' }}>➖ Sell</button>
                          <button onClick={() => handleRestock(p.id)} style={{ backgroundColor: '#ffc107' }}>➕ Restock</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;