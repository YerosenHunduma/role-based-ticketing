import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCredentials } from '../redux/features/authSlice';
import { login } from '../services/auth/authApiCall';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface LoginProps {
    setCredentials: (payload: any) => void;
    navigate: (path: string) => void;
}

class Login extends Component<LoginProps> {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, password } = this.state;
        const { navigate, setCredentials } = this.props;

        try {
            const res = await login({ username, password });
            if (res.data) {
                setCredentials(res.data);
                navigate(res.data.role === 'admin' ? '/admin' : '/user');
            }
        } catch (err: any) {
            console.error('Login failed', err);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else if (err.request) {
                toast.error('No response from the server. Please check your network connection.');
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        }
    };

    render() {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                    <form onSubmit={this.handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            create an account?
                            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { setCredentials })(Login);
