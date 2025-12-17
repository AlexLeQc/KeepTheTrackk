import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading } = useAuth();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <h1>
            Keepthetrackk
          </h1>
          <p>Votre inventaire personnel</p>
        </div>

        {isLogin ? (
          <LoginForm onLogin={login} loading={loading} />
        ) : (
          <RegisterForm onRegister={register} loading={loading} />
        )}

        <div className="auth-toggle">
          <button
            className="btn-link"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin
              ? "Pas encore de compte ? S'inscrire"
              : "Déjà un compte ? Se connecter"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
