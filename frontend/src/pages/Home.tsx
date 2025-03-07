import { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to the Ticketing System</h1>
                <p className="text-lg text-pgray mb-8">Please log in or sign up to continue.</p>
                <div className="flex space-x-4">
                    <Link to="/login" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-lightprimary transition duration-300">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-lightprimary transition duration-300">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;
