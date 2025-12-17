import { useState } from "react";

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && qty >= 0 && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAdd(name.trim(), qty);
        setName("");
        setQty(0);
      } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="add-form-card">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-form-header">
          <h3 className="add-form-title">Ajouter un article</h3>
        </div>

        <div className="add-form-content">
          <div className="form-group">
            <label className="form-label" htmlFor="item-name">
              Nom de l'article
            </label>
            <input
              id="item-name"
              type="text"
              className="form-input"
              placeholder="Ex: Clavier, Casque..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="item-qty">
              Quantité
            </label>
            <input
              id="item-qty"
              type="number"
              className="form-input"
              placeholder="0"
              min="0"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 0)}
              required
            />
          </div>
        </div>
        <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner">⏳</span>
                Ajout en cours...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4v16m8-8H4"/>
                </svg>
                Ajouter au stock
              </>
            )}
          </button>
      </form>
    </div>
  );
}
