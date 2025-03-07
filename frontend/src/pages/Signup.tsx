import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCredentials } from '../redux/features/authSlice';
import { register } from '../services/auth/authApiCall';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaUserTag, FaArrowLeft } from 'react-icons/fa';

interface SignupProps {
    navigate: (path: string) => void;
}

class Signup extends Component<SignupProps> {
    state = {
        username: '',
        password: '',
        role: 'user',
        isLoading: false
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, password, role } = this.state;
        const { navigate } = this.props;

        try {
            this.setState({ isLoading: true });
            const res = await register({ username, password, role });
            toast.success('User registered successfully.');
            this.setState({ isLoading: false });
            if (res.data) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (err: any) {
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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-900 to-gray-900">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <Link to="/">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
                    <form onSubmit={this.handleSubmit} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUserTag className="text-gray-400" />
                            </div>
                            <select
                                value={this.state.role}
                                onChange={(e) => this.setState({ role: e.target.value })}
                                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={this.state.isLoading}
                            className={`w-full py-2 rounded-lg cursor-pointer transition duration-300 ${
                                this.state.isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-900 hover:bg-cyan-800 text-white'
                            }`}
                        >
                            {this.state.isLoading ? 'Signing up...' : 'Register'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-cyan-700 hover:text-cyan-900 font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { setCredentials })(Signup);
