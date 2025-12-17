import { useInventory } from "./hooks/useInventory";
import AddItemForm from "./components/AddItemForm";
import InventoryStats from "./components/InventoryStats";
import InventoryActions from "./components/InventoryActions";
import InventoryList from "./components/InventoryList";

function App() {
  const { items, loading, addItem, deleteItem, stats } = useInventory();

  return (
    <div className="container">
      <header>
        <h1>
          Keepthetrackk
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
          Gestion simplifiée de votre inventaire
        </p>
      </header>

      <AddItemForm onAdd={addItem} />

      <section className="inventory-section">
        <div className="inventory-header">
          <h2 className="inventory-title">📋 Articles en stock</h2>
          <div className="inventory-actions">
            <InventoryStats stats={stats} />
            <InventoryActions items={items} />
          </div>
        </div>

        <InventoryList
          items={items}
          onDelete={deleteItem}
          loading={loading}
        />
      </section>
    </div>
  );
}

export default App;
