import { Attendance } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceState {
  attendance: Attendance[] | null;
}


const initialState: AttendanceState = {
  attendance: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendance(state, action: PayloadAction<Attendance[] | null>) {
      state.attendance = action.payload;
    },
    addAttendance(state, action: PayloadAction<Attendance>) {
      if (state.attendance) {
        state.attendance.push(action.payload);
      }
    },
    removeAttendance(state, action: PayloadAction<string>) {
      if (state.attendance) {
        state.attendance = state.attendance.filter(
          (record) => record.id !== action.payload
        );
      }
    },
    clearAttendance(state) {
      state.attendance = null;
    },
  },
});

export const {
  setAttendance,
  addAttendance,
  removeAttendance,
  clearAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
