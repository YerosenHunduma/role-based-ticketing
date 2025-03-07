import { Component } from 'react';
import { connect } from 'react-redux';
import { getTickets, updateTicketStatus } from '../services/ticket/ticketApiCall';
import { RootState } from '../redux/app/store';
import Spinner from '../components/Spinner';

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
            await updateTicketStatus({ _id: id, status });
            this.fetchTickets();
        } catch (err) {
            console.error('Failed to update ticket status', err);
        }
    };

    render() {
        const { tickets, isLoading, isError, selectedStatus } = this.state;

        if (isLoading) return <Spinner />;
        if (isError) return <div className="text-red-500">Error fetching tickets</div>;

        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-primary">Admin Dashboard</h1>
                <h2 className="text-xl font-semibold mb-4 text-secondary">All Tickets</h2>
                <ul className="space-y-2">
                    {tickets.map((ticket) => (
                        <li key={ticket._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-pblack">{ticket.title}</h3>
                            <p className="text-gray-600">{ticket.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <p className="text-sm text-pgray">Status: {ticket.status}</p>
                                <select
                                    value={selectedStatus[ticket._id] || ticket.status}
                                    onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                                    className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="Open">Open</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <button onClick={() => this.handleUpdateStatus(ticket._id)} className="bg-black text-white px-4 py-1 rounded-lg hover:bg-lightprimary transition duration-300">
                                    Update Status
                                </button>
                            </div>
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

export default connect(mapStateToProps)(AdminDashboard);
