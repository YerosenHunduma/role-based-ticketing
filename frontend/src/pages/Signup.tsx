import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCredentials } from '../redux/features/authSlice';
import { register } from '../services/auth/authApiCall';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface SignupProps {
    navigate: (path: string) => void;
}

class Signup extends Component<SignupProps> {
    state = {
        username: '',
        password: '',
        role: 'user'
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, password, role } = this.state;
        const { navigate } = this.props;

        try {
            const res = await register({ username, password, role });
            console.log(res);
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
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
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
                        <select
                            value={this.state.role}
                            onChange={(e) => this.setState({ role: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="w-full  bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                            Register
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">
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
