import { createSlice } from '@reduxjs/toolkit';

// Holds the in-progress booking as the user moves: search -> seats -> checkout.
const initialState = {
  schedule: null, // enriched schedule (with bus + route)
  selectedSeats: [],
  passengers: [], // [{ name, age, gender, seat }]
  contact: { email: '', phone: '' },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSchedule: (state, action) => {

      state.schedule = action.payload;
      state.selectedSeats = [];
      state.passengers = [];
    },
    toggleSeat: (state, action) => {
      const seat = String(action.payload);
      if (state.selectedSeats.includes(seat)) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seat);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload.map(String);
    },
    setPassengers: (state, action) => {
      state.passengers = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    clearBooking: () => initialState,
  },
});

export const { setSchedule, toggleSeat, setSelectedSeats, setPassengers, setContact, clearBooking } =
  bookingSlice.actions;

export const selectBooking = (s) => s.booking;

export default bookingSlice.reducer;
