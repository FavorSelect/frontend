import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  image: string | null;
  adminReply: string | null;
  createdAt: string;
}

interface OpenTicketState {
  tickets: Ticket[];
}

const initialState: OpenTicketState = {
  tickets: [],
};

const openTicketSlice = createSlice({
  name: "openTicket",
  initialState,
  reducers: {
    setOpenTickets(state, action: PayloadAction<Ticket[]>) {
      state.tickets = action.payload;
    },
  },
});

export const { setOpenTickets } = openTicketSlice.actions;
export default openTicketSlice.reducer;
