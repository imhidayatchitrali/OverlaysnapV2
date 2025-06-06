/* eslint-disable @typescript-eslint/no-explicit-any */
// Login.tsx
import React, { useState, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react';

// Lazy load heavy components
const GoogleIcon = lazy(() => import('../components/icons/GoogleIcon'));
const FacebookIcon = lazy(() => import('../components/icons/FacebookIcon'));

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                navigate('/my-hub');
            } else {
                await signup(email, password, name);
                navigate('/create-event');
            }
        } catch (err: any) {
            console.error('Authentication error:', err);
            setError(err.message || 'Failed to authenticate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            console.log("Google login successful!");
        } catch {
            alert("Google login failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-2">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    {/* <div className="mx-auto bg-gradient-to-r from-[#24D7DB] to-[#FDA503] w-20 h-20 rounded-full flex items-center justify-center mb-4">
                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                            <div className="bg-gradient-to-r from-[#24D7DB] to-[#FDA503] w-12 h-12 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div> */}

                    <h2 className="text-3xl font-bold text-gray-800">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {isLogin
                            ? 'Sign in to access your events'
                            : 'Join us to create amazing photo experiences'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 rounded-lg flex items-start">
                            <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-1" size={20} />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-100 border-b-4 border-b-[#24D7DB] text-sm focus:outline-none rounded-md focus:ring-0"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-gray-100 border-b-4 border-b-[#24D7DB] text-sm focus:outline-none rounded-md focus:ring-0"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-gray-100 border-b-4 border-b-[#24D7DB] text-sm focus:outline-none rounded-md focus:ring-0"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#24D7DB] text-white py-3 rounded-lg font-semibold text-sm shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : isLogin ? (
                                'Sign In'
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-sm font-medium hover:underline flex items-center justify-center w-full"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Suspense fallback={<div className="w-5 h-5 mr-2 bg-gray-200 rounded"></div>}>
                                    <GoogleIcon className="w-5 h-5 mr-2" />
                                </Suspense>
                                Google
                            </button>

                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Suspense fallback={<div className="w-5 h-5 mr-2 bg-gray-200 rounded"></div>}>
                                    <FacebookIcon className="w-5 h-5 mr-2" />
                                </Suspense>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-sm text-gray-600 hover:text-[#24D7DB] hover:underline"
                    >
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;