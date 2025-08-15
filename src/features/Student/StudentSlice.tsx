import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

type StudentDataType = {
  studentId: string | null,
  firstname: string | null,
  lastname: string | null,
  createdAt: string | null,
  updatedAt: string | null,
  accountId: string | null,
  grade: number | null,
  section: string | null,
  batch: string | null,
  attendanceDate: {
    attendanceDateId: string | null,
    date: string | null,
    status: string | null
  }[]
}

type StudentState = {
  studentData: StudentDataType[]
}

const initialState: StudentState = {
  studentData: []
}

const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    addStudentData: (state, action: PayloadAction<StudentDataType[]>) => {
      state.studentData = action.payload
    },

    updateStudentData: (state, action) => {
      const index = state.studentData.findIndex(data => data.studentId === action.payload.studentId);

      if (index !== -1) {
        state.studentData[index] = {
          ...action.payload,
          attendanceDate: {
            attendanceDateId: action.payload.attendanceDateId,
            date: action.payload.date,
            status: action.payload.status
          }
        } 
      }
    },
  }
})

export const { addStudentData, updateStudentData } = studentSlice.actions;

export default studentSlice.reducer 

export const studentDataSlice = (state: RootState) => state.student 