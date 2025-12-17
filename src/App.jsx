import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import AddItemForm from "./components/AddItemForm";
import InventoryItem from "./components/Inventory/InventoryItem";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "inventaire"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const handleAdd = async (nom, quantite) => {
    await addDoc(collection(db, "inventaire"), {
      nom,
      quantite: Number(quantite),
      createdAt: new Date(),
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "inventaire", id));
  };

  return (
    <div className="container">
      <h1>Keepthetrackk 📦</h1>

      <AddItemForm onAdd={handleAdd} />

      <ul className="inventory-list">
        {items.map((item) => (
          <InventoryItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default App;
