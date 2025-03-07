import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux/app/store';

interface HomeProps {
    user: { username: string; role: string } | null;
}
class Home extends Component<HomeProps> {
    render() {
        const { user } = this.props;
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url('home.jpg')` }}>
                <div className=" bg-gradient-to-b from-cyan-950/70 to-gray-600/80  text-center h-screen w-screen flex flex-col justify-center items-center">
                    <h1 className="text-6xl  text-white mb-4 use">Welcome to the Ticketing System</h1>

                    {user ? (
                        <div className="text-white">
                            <h1 className="text-4xl font-bold text-primary mb-4">Welcome, {user.username}!</h1>
                            <p className="text-lg text-pgray mb-8">You are logged in. Explore your dashboard.</p>
                            <Link to={user.role === 'admin' ? '/admin' : '/user'} className="text-white bg-cyan-900 py-2 px-5 rounded-md transition duration-300">
                                {' '}
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="text-xl text-gray-200 mb-8">Please log in or sign up to continue.</p>
                            <div className="flex space-x-4">
                                <Link to="/login" className="bg-cyan-900 text-white px-6 py-2 rounded-lg transition duration-300">
                                    Login
                                </Link>
                                <Link to="/signup" className=" text-white border-2 border-cyan-900 px-6 py-2 rounded-lg  transition duration-300">
                                    Signup
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Home);
