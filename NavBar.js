// src/components/Navbar.js
const Navbar = ({ active, setActive }) => {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <h3>Wings Cafe Inventory</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          'dashboard',
          'inventory',
          'add',
          'sales',
          'logs',
          'customer',
          'reporting'
        ].map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: active === tab ? '#3498db' : '#95a5a6',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;