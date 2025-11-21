import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
        
        if (!name || !email || !password || !confirm) {
            setError('Please complete all fields.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setError('Password should be at least 8 characters.');
            return;
        }
        
        setLoading(true);

        try {
            const res = await fetch(`${API}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    profile_picture: null,
                    password, 
                    password_confirmation: confirm,
                }),
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.message || 'Failed to create account.');
            }

            // on success navigate to login (or adapt as needed)
            navigate('/login');
        } catch (err) {
            console.log(err || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-secondary to-white p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 ring-1 ring-primary/10">
                <h1 className="text-2xl font-semibold text-tertiary mb-2">Create an account</h1>
                <p className="text-sm text-tertiary/70 mb-5">Get started with Savorio — it's quick and easy.</p>

                {error && (
                    <div className="mb-4 text-sm text-primary bg-primary/10 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-tertiary mb-1">Full name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="Your name"
                        />
                    </div>

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
                            placeholder="Create a password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-tertiary mb-1">Confirm password</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-white rounded-md hover:brightness-95 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-tertiary/70">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}