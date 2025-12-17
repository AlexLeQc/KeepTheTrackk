import { useAuth } from "./hooks/useAuth";
import { useInventory } from "./hooks/useInventory";
import AuthPage from "./components/Auth/AuthPage";
import Navbar from "./components/Navbar";
import AddItemForm from "./components/AddItemForm";
import InventoryStats from "./components/InventoryStats";
import InventoryActions from "./components/InventoryActions";
import InventoryList from "./components/InventoryList";

function App() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { items, loading: inventoryLoading, addItem, deleteItem, stats } = useInventory(user);

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '100px' }}>
        <header style={{ marginBottom: 'var(--spacing-xl)' }}>
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
            loading={inventoryLoading}
          />
        </section>
      </div>
    </>
  );
}

export default App;
