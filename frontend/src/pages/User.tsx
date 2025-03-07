import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTickets, createTicket } from '../services/ticket/ticketApiCall';
import { RootState } from '../redux/app/store';
import Spinner from '../components/Spinner';
import { FaPlus, FaTicketAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
            toast.success('Ticket created successfully.');
            this.fetchTickets();
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

    getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    render() {
        const { tickets, isLoading, isError, title, description } = this.state;

        if (isLoading) return <Spinner />;
        if (isError) return <div className="text-red-500 text-center mt-8">Error fetching tickets. Please try again later.</div>;

        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-cyan-900 flex items-center">
                        <FaTicketAlt className="mr-2" /> User Dashboard
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                        <form onSubmit={this.handleCreateTicket} className="mb-8 bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-semibold mb-4 text-cyan-800 flex items-center">
                                <FaPlus className="mr-2" /> Create New Ticket
                            </h2>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => this.setState({ title: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                rows={4}
                            />
                            <button type="submit" className="w-full bg-cyan-900 text-white py-2 rounded-lg hover:bg-cyan-800 transition duration-300 flex items-center cursor-pointer justify-center">
                                <FaPlus className="mr-2" /> {this.state.isLoading ? 'Creating...' : 'Create Ticket'}
                            </button>
                        </form>
                        <div className="bg-white p-6">
                            <h2 className="text-xl font-semibold mb-4 text-cyan-800 flex items-center">
                                <FaTicketAlt className="mr-2" /> Your Tickets
                            </h2>
                            {tickets.length > 0 ? (
                                <ul className="space-y-4">
                                    {tickets.map((ticket) => (
                                        <li key={ticket._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                            <h3 className="text-lg font-semibold text-cyan-900">{ticket.title}</h3>
                                            <p className="text-gray-600 mt-2">{ticket.description}</p>
                                            <div className="mt-3">
                                                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${this.getStatusColor(ticket.status)}`}>{ticket.status}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <h1 className="text-gray-700">You don't have any tickets</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    userId: state.auth.user?.id,
    role: state.auth.user?.role
});

export default connect(mapStateToProps)(UserDashboard);
