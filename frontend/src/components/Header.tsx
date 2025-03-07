import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/app/store';
import { Link } from 'react-router-dom';
import { logout as logoutApi } from '../services/auth/authApiCall';
import { logout } from '../redux/features/authSlice';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

interface HeaderProps {
    user: { username: string; role: string } | null;
    logout: () => void;
}

class Header extends Component<HeaderProps> {
    handleLogout = async () => {
        try {
            await logoutApi();
            this.props.logout();
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Failed to log out. Please try again.');
        }
    };

    render() {
        const { user } = this.props;

        return (
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-black text-2xl font-bold">
                        Ticketing System
                    </Link>
                    <nav className="flex space-x-4">
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/user'} className="text-black hover:text-lightprimary transition duration-300">
                                    Dashboard
                                </Link>
                                <button onClick={this.handleLogout} className="text-black hover:text-lightprimary transition duration-300">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-black hover:text-lightprimary transition duration-300">
                                    Login
                                </Link>
                                <Link to="/signup" className="text-black hover:text-lightprimary transition duration-300">
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
