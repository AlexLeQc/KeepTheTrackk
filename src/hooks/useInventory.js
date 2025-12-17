import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export function useInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inventaire"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addItem = async (nom, quantite) => {
    await addDoc(collection(db, "inventaire"), {
      nom,
      quantite: Number(quantite),
      createdAt: new Date(),
    });
  };

  const deleteItem = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await deleteDoc(doc(db, "inventaire", id));
    }
  };

  const getStats = () => {
    const totalItems = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantite, 0);
    const lowStockItems = items.filter(item => item.quantite <= 5 && item.quantite > 0).length;
    const outOfStockItems = items.filter(item => item.quantite === 0).length;

    return {
      totalItems,
      totalQuantity,
      lowStockItems,
      outOfStockItems,
    };
  };

  return {
    items,
    loading,
    addItem,
    deleteItem,
    stats: getStats(),
  };
}
