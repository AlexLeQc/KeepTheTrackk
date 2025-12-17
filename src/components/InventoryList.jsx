import PropTypes from 'prop-types';
import InventoryItem from './Inventory/InventoryItem';

export default function InventoryList({ items, onDelete, loading }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="loading-spinner" style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Chargement de l'inventaire...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="inventory-empty">
        <div className="inventory-empty-icon">📦</div>
        <h3>Aucun article en stock</h3>
        <p>Commencez par ajouter votre premier article à l'inventaire en utilisant le formulaire ci-dessus.</p>
      </div>
    );
  }

  return (
    <ul className="inventory-list">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}

InventoryList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      quantite: PropTypes.number.isRequired,
      createdAt: PropTypes.object,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
