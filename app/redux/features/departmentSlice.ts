import { Department } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

interface DepartmentState {
  departments: Department[];
  selectedDepartment: Department | null;
}

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
    selectedDepartment: null,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    selectDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export const { setDepartments, selectDepartment } = departmentSlice.actions;

export const selectAllDepartments = (state: {department: DepartmentState }) => state.department.departments;
export const selectSelectedDepartment = (state: { department: DepartmentState }) =>
  state.department.selectedDepartment;

export default departmentSlice.reducer;
