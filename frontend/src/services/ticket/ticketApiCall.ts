import { axiosInstance } from '../axiosInstance';

export const getTickets = async () => {
    const response = await axiosInstance.get('/ticket/get-all-tickets');
    console.log(response.data);
    return response;
};

export const createTicket = async (ticket: { title: string; description: string }) => {
    const response = await axiosInstance.post('/ticket/create-ticket', ticket);
    return response;
};

export const updateTicketStatus = async (data: { _id: string; status: string }) => {
    const response = await axiosInstance.put(`/ticket/update-ticket/${data._id}`, { status: data.status });
    console.log(response.data);
    return response;
};
