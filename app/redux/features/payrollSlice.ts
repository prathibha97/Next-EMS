// payrollSlice.ts

import { Payroll } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayrollState {
  payroll: Payroll | null;
  payrolls: Payroll[];
}

const initialState: PayrollState = {
  payroll: null,
  payrolls: [],
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    addPayrollData(state, action: PayloadAction<Payroll>) {
      if (!action.payload) return;
      state.payroll = action.payload;
      state.payrolls.push(action.payload);
    },
    updatePayrollData(state, action: PayloadAction<Payroll>) {
      if (!action.payload) return;

      // Find the index of the payroll to update
      const index = state.payrolls.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.payrolls[index] = action.payload;
        state.payroll = action.payload;
      }
    },
    removePayrollData(state, action: PayloadAction<Payroll>) {
      if (!action.payload) return;
        state.payrolls = state.payrolls.filter(
          (p) => p.id !== action.payload.id
        );
        state.payroll = null;
    },
    selectPayroll(state, action: PayloadAction<Payroll>) {
      state.payroll = action.payload;
    },
  },
});

export const { addPayrollData, updatePayrollData, removePayrollData, selectPayroll } =
  payrollSlice.actions;

export default payrollSlice.reducer;
