import PropTypes from 'prop-types';

export default function InventoryStats({ stats }) {
  const { totalItems, totalQuantity, lowStockItems, outOfStockItems } = stats;

  return (
    <div className="inventory-stats">
      <span>📊 {totalItems} article{totalItems !== 1 ? 's' : ''}</span>
      <span>🔢 {totalQuantity} unité{totalQuantity !== 1 ? 's' : ''} total</span>

      {lowStockItems > 0 && (
        <span style={{ color: 'var(--warning-color)' }}>
          ⚠️ {lowStockItems} stock{lowStockItems !== 1 ? 's' : ''} faible{lowStockItems !== 1 ? 's' : ''}
        </span>
      )}

      {outOfStockItems > 0 && (
        <span style={{ color: 'var(--danger-color)' }}>
          🚨 {outOfStockItems} rupture{outOfStockItems !== 1 ? 's' : ''} de stock
        </span>
      )}
    </div>
  );
}

InventoryStats.propTypes = {
  stats: PropTypes.shape({
    totalItems: PropTypes.number.isRequired,
    totalQuantity: PropTypes.number.isRequired,
    lowStockItems: PropTypes.number.isRequired,
    outOfStockItems: PropTypes.number.isRequired,
  }).isRequired,
};
