// src/components/ReportingModule.js
const ReportingModule = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>📈 Reporting & Analytics</h2>
        <p>
          View sales trends, top-selling products, inventory forecasts, and low-stock alerts.
        </p>
        <ul>
          <li>📉 Monthly Sales Report</li>
          <li>📦 Inventory Summary</li>
          <li>🔥 Low Stock Alerts</li>
        </ul>
        <button className="btn-primary">Generate Report</button>
      </div>
    </div>
  );
};

export default ReportingModule;