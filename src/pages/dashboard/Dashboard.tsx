import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    setError('');
    setLoading(true);
    const token = localStorage.getItem('auth_token');

    const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

    try {
      const res = await fetch(`${API}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || 'Logout failed');
      }
    } catch (err) {
      console.error(err);
      // proceed to clear token and redirect anyway
    } finally {
      localStorage.removeItem('auth_token');
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-white p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 ring-1 ring-primary/10">
        <h1 className="text-2xl font-semibold text-tertiary mb-2">Welcome to Savorio</h1>
        <p className="text-sm text-tertiary/70 mb-6">You are signed in.</p>

        {error && (
          <div className="mb-4 text-sm text-primary bg-primary/10 p-2 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleSignOut}
          className="w-full py-2 bg-primary text-white rounded-md hover:brightness-95 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard