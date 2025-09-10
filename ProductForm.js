import React, { useState } from 'react';

const ProductForm = ({ onSubmit, product, title = "Add Product" }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    category: product.category || '',
    price: product.price || '',
    quantity: product.quantity || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    });
    setFormData({ name: '', description: '', category: '', price: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{title}</h2>
      <input name="name" placeholder="Product Name" required
             value={formData.name} onChange={handleChange} />

      <input name="description" placeholder="Description"
             value={formData.description} onChange={handleChange} />

      <input name="category" placeholder="Category (e.g., Food, Beverage)"
             value={formData.category} onChange={handleChange} />

      <input name="price" type="number" step="0.01" placeholder="Price"
             value={formData.price} onChange={handleChange} required />

      <input name="quantity" type="number" placeholder="Initial Quantity"
             value={formData.quantity} onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'grid',
    gap: '10px',
    maxWidth: '500px',
    margin: '20px 0'
  }
};

export default ProductForm;