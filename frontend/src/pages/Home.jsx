import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import '../features/auth/auth.form.scss';

const Home = () => {
  const { user, handleLogout, loading } = useAuth();

  return (
    <main>
      <div className="form-container" style={{ textAlign: "center", alignItems: "center" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>
          Welcome Home{user?.username ? `, ${user.username}` : ''}!
        </h1>
        <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
          You have successfully logged into your protected dashboard.
        </p>
        
        {user?.email && (
          <div style={{ padding: "1rem", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "0.5rem", marginBottom: "2rem", width: "100%" }}>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        <button 
            className="button primary-button" 
            onClick={handleLogout}
            disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </main>
  );
};

export default Home;
