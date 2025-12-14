// Simple Card component for analytics
const StatCard = ({ title, value }) => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px #e0e0e0',
    padding: 32,
    minWidth: 200,
    textAlign: 'center',
    margin: 8,
    color: '#222',
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 1,
    transition: 'transform 0.2s',
    cursor: 'pointer',
    border: '2px solid #f5f5f5',
  }}>
    <h3 style={{ fontSize: 20, color: '#888', opacity: 0.85, marginBottom: 12 }}>{title}</h3>
    <div style={{ fontSize: 40, fontWeight: 900, color: '#222' }}>{value}</div>
  </div>
);

export default StatCard;
