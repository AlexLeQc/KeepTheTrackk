import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      await logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h1>
            Keepthetrackk
          </h1>
        </div>

        {user && (
          <div className="navbar-user">
            <span className="user-greeting">
              Bonjour, {user.displayName || user.email}
            </span>
            <button
              className="btn btn-secondary logout-btn"
              onClick={handleLogout}
            >
              🚪 Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
