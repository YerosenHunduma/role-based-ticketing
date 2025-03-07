import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTickets, createTicket } from '../services/ticket/ticketApiCall';
import { RootState } from '../redux/app/store';
import Spinner from '../components/Spinner';

interface UserDashboardProps {
    userId: string;
    role: string;
}

interface UserDashboardState {
    tickets: any[];
    title: string;
    description: string;
    isLoading: boolean;
    isError: boolean;
}

class UserDashboard extends Component<UserDashboardProps, UserDashboardState> {
    state: UserDashboardState = {
        tickets: [],
        title: '',
        description: '',
        isLoading: true,
        isError: false
    };

    componentDidMount() {
        this.fetchTickets();
    }

    fetchTickets = async () => {
        try {
            const response = await getTickets();
            const tickets = response.data;
            this.setState({ tickets, isLoading: false });
        } catch (err) {
            this.setState({ isError: true, isLoading: false });
        }
    };

    handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        const { title, description } = this.state;

        try {
            await createTicket({ title, description });
            this.setState({ title: '', description: '' });
            this.fetchTickets();
        } catch (err) {
            console.error('Failed to create ticket', err);
        }
    };

    render() {
        const { tickets, isLoading, isError, title, description } = this.state;

        if (isLoading) return <Spinner />; // Use the Spinner component
        if (isError) return <div className="text-red-500">Error fetching tickets</div>;

        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-primary">User Dashboard</h1>
                <form onSubmit={this.handleCreateTicket} className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-secondary">Create New Ticket</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-lightprimary transition duration-300">
                        Create Ticket
                    </button>
                </form>
                <h2 className="text-xl font-semibold mb-4 text-secondary">Your Tickets</h2>
                <ul className="space-y-2">
                    {tickets.map((ticket) => (
                        <li key={ticket._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-pblack">{ticket.title}</h3>
                            <p className="text-gray-600">{ticket.description}</p>
                            <p className="text-sm text-pgray">Status: {ticket.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    userId: state.auth.user?.id,
    role: state.auth.user?.role
});

export default connect(mapStateToProps)(UserDashboard);
