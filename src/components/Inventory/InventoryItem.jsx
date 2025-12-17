import "./InventoryItem.css";

export default function InventoryItem({ item, onDelete }) {
  return (
    <li className="inventory-card">
      <div className="item-info">
        <span className="item-name">{item.nom}</span>
        <span className="item-qty">Quantité : {item.quantite}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(item.id)}>
        🗑️
      </button>
    </li>
  );
}
