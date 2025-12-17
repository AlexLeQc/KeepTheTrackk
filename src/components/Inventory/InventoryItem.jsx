export default function InventoryItem({ item, onDelete }) {
  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: 'Rupture', color: 'var(--danger-color)' };
    if (quantity <= 5) return { label: 'Faible', color: 'var(--warning-color)' };
    return { label: 'En stock', color: 'var(--success-color)' };
  };

  const stockStatus = getStockStatus(item.quantite);

  return (
    <li className="inventory-card">
      <div className="inventory-card-header">
        <h4 className="item-name">{item.nom}</h4>
        <div className="item-actions">
          <button
            className="btn-icon"
            onClick={() => onDelete(item.id)}
            title="Supprimer cet article"
            aria-label="Supprimer"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="inventory-card-content">
        <div className="item-info">
          <span className="item-label">Quantité</span>
          <span
            className="item-qty"
            style={{
              backgroundColor: item.quantite === 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              color: item.quantite === 0 ? 'var(--danger-color)' : 'var(--success-color)',
              borderColor: item.quantite === 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'
            }}
          >
            {item.quantite} {item.quantite === 1 ? 'unité' : 'unités'}
          </span>
        </div>

        <div className="item-info">
          <span className="item-label">État</span>
          <span
            className="item-value"
            style={{ color: stockStatus.color, fontWeight: '600' }}
          >
            {stockStatus.label}
          </span>
        </div>

        {item.createdAt && (
          <div className="item-date">
            Ajouté le {formatDate(item.createdAt)}
          </div>
        )}
      </div>
    </li>
  );
}
