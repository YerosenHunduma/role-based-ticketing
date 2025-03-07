import { Component } from 'react';
import { connect } from 'react-redux';
import { getTickets, updateTicketStatus } from '../services/ticket/ticketApiCall';
import { RootState } from '../redux/app/store';
import Spinner from '../components/Spinner';
import { FaTicketAlt, FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';
interface AdminDashboardProps {
    userId: string;
    role: string;
}

interface AdminDashboardState {
    tickets: any[];
    isLoading: boolean;
    isError: boolean;
    selectedStatus: { [key: string]: string };
}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState> {
    state: AdminDashboardState = {
        tickets: [],
        isLoading: true,
        isError: false,
        selectedStatus: {}
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

    handleStatusChange = (id: string, status: string) => {
        this.setState((prevState) => ({
            selectedStatus: {
                ...prevState.selectedStatus,
                [id]: status
            }
        }));
    };

    handleUpdateStatus = async (id: string) => {
        const { selectedStatus } = this.state;
        const status = selectedStatus[id];

        if (!status) {
            alert('Please select a status before updating.');
            return;
        }

        try {
            this.setState({ isLoading: true });
            await updateTicketStatus({ _id: id, status });
            this.setState({ isLoading: false });
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
        const { tickets, isLoading, isError, selectedStatus } = this.state;

        if (isLoading) return <Spinner />;
        if (isError) return <div className="text-red-500 text-center mt-8">Error fetching tickets. Please try again later.</div>;

        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-cyan-900 flex items-center">
                        <FaTicketAlt className="mr-2" /> Admin Dashboard
                    </h1>

                    <h2 className="text-xl font-semibold mb-4 text-cyan-800 flex items-center">
                        <FaTicketAlt className="mr-2" /> All Tickets
                    </h2>

                    <ul className="space-y-4">
                        {tickets.map((ticket) => (
                            <li key={ticket._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-cyan-900">{ticket.title}</h3>
                                <p className="text-gray-600 mt-2">{ticket.description}</p>
                                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 space-y-2 items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${this.getStatusColor(ticket.status)}`}>{ticket.status}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={selectedStatus[ticket._id] || ticket.status}
                                            onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="InProgress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                        <button
                                            onClick={() => this.handleUpdateStatus(ticket._id)}
                                            disabled={this.state.isLoading}
                                            className="bg-cyan-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition duration-300 cursor-pointer flex items-center"
                                        >
                                            <FaSync className="mr-2" />
                                            {this.state.isLoading ? 'Updating...' : 'Update status'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    userId: state.auth.user?.id,
    role: state.auth.user?.role
});

export default connect(mapStateToProps)(AdminDashboard);
