import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Accédez à votre inventaire</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary auth-submit-btn"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
