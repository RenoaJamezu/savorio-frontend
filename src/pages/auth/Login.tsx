import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        setLoading(true);

        const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

        try {
            const res = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            const token = data.token || data.access_token;
            if (token) {
                localStorage.setItem('name', data.user.name);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('auth_token', token);
            }

            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Network error. Check backend is running.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-white p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 ring-1 ring-primary/10">
                <h1 className="text-2xl font-semibold text-tertiary mb-2">Welcome back</h1>
                <p className="text-sm text-tertiary/70 mb-6">Sign in to continue to Savorio.</p>

                {error && (
                    <div className="mb-4 text-sm text-primary bg-primary/10 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-tertiary mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-tertiary mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="Your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-white rounded-md hover:brightness-95 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-tertiary/70">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                        Create one
                    </Link>
                </div>

                <div className="mt-6">
                    <div className="text-xs text-tertiary/50 text-center mb-2">Demo credentials</div>
                    <div className="text-xs text-tertiary/60 text-center">email: demo@savorio.test | password: password</div>
                </div>
            </div>
        </div>
    );
}