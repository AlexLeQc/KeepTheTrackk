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
  where,
} from "firebase/firestore";

export function useInventory(user) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "inventaire"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addItem = async (nom, quantite) => {
    if (!user) throw new Error("Utilisateur non connecté");

    await addDoc(collection(db, "inventaire"), {
      nom,
      quantite: Number(quantite),
      userId: user.uid,
      createdAt: new Date(),
    });
  };

  const deleteItem = async (id) => {
    if (!user) throw new Error("Utilisateur non connecté");

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
