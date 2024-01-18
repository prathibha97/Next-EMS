import { Employee } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EmployeeState = {
  employee: Employee | null;
  currentEmployee: Employee | null;
  employees: Employee[];
};

const initialState: EmployeeState = {
  employee: null,
  employees: [],
  currentEmployee: null
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<Employee | null>) => {
      if (!action.payload) return;
      state.employee = action.payload;
    },
    setCurrentEmployee: (state, action: PayloadAction<Employee | null>) => {
      if (!action.payload) return;
      state.currentEmployee = action.payload;
    },
    clearCurrentEmployee: (state) => {
     state.currentEmployee = null;
    },
    clearEmployee: (state) => {
      state.employee = null;
    },
    getEmployee: (state, action: PayloadAction<Employee>) => {
      state.employee = action.payload;
    },
    updateEmployeeData: (state, action: PayloadAction<Employee | null>) => {
      if (!action.payload) return;
      if (state.employee) {
        state.employee = { ...state.employee, ...action.payload };
      }
    },
    deleteEmployee: (state) => {
      state.employee = null;
    },
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployees: (state, action: PayloadAction<Partial<Employee>>) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id
          ? { ...employee, ...action.payload }
          : employee
      );
    },
    deleteEmployees: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

export const {
  setEmployee,
  setCurrentEmployee,
  clearCurrentEmployee,
  clearEmployee,
  getEmployee,
  updateEmployeeData,
  deleteEmployee,
  setEmployees,
  addEmployee,
  updateEmployees,
  deleteEmployees,
} = employeeSlice.actions;
export default employeeSlice.reducer;
