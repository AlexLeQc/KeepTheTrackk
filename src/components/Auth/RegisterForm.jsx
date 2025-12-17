import { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegisterForm({ onRegister, loading }) {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { displayName, email, password, confirmPassword } = formData;

    if (!displayName || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      await onRegister(email, password, displayName);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Inscription</h2>
        <p className="auth-subtitle">Créez votre compte</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="displayName">Nom d'utilisateur</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            className="form-input"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Au moins 6 caractères"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Répétez votre mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary auth-submit-btn"
          disabled={loading}
        >
          {loading ? 'Création...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
