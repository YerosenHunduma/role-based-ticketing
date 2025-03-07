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
            <>
                {user ? (
                    <div className="bg-cyan-950">
                        {' '}
                        <header className="max-w-screen-xl mx-auto shadow-md">
                            <div className="container text-white mx-auto px-4 py-4 flex justify-between items-center">
                                <Link to="/" className=" text-2xl font-bold">
                                    <h1>Ticketing System</h1>
                                </Link>
                                <nav className="flex space-x-4">
                                    <button onClick={this.handleLogout} className=" transition duration-300 cursor-pointer">
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </header>
                    </div>
                ) : (
                    <></>
                )}
            </>
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
