import { useState } from "react";

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && qty >= 0) {
      onAdd(name, qty);
      setName("");
      setQty(0);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de l'objet"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button type="submit">Ajouter au stock</button>
    </form>
  );
}
