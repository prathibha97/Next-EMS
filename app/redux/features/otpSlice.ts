import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OTP = {
  OTPValue: string | null;
  email: string | null;
};

interface OptState {
  OTPValue: string | null;
  email: string | null;
}

const initialState: OptState = {
  OTPValue: null,
  email: null,
};

const optSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOpt(state, action: PayloadAction<OTP>) {
      state.OTPValue = action.payload.OTPValue;
      state.email = action.payload.email;
    },
    clearOTP(state) {
      state.OTPValue = null;
      state.email = null;
    },
  },
});

export const { setOpt, clearOTP } = optSlice.actions;
export default optSlice.reducer;
