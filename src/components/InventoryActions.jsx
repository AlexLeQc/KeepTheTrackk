import PropTypes from 'prop-types';
import { exportInventoryToExcel } from '../utils/excelExport';

export default function InventoryActions({ items }) {
  const handleExport = () => {
    exportInventoryToExcel(items);
  };

  return (
    <button
      className="btn btn-secondary export-btn"
      onClick={handleExport}
      disabled={items.length === 0}
      title="Exporter l'inventaire en Excel"
    >
      📊 Exporter Excel
    </button>
  );
}

InventoryActions.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      quantite: PropTypes.number.isRequired,
      createdAt: PropTypes.object,
    })
  ).isRequired,
};
