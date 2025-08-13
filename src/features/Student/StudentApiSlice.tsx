import { apiSlice } from "../api/api";

type studentsData = {
  studentData: {
    studentId: string,
    firstname: string,
    lastname: string,
    createdAt: string,
    updatedAt: string,
    accountId: string,
    grade: string,
    section: string,
    batch: {
      year: string,
    },
    attendanceDate: {
      attendanceDateId: string,
      date: string,
      status: string
    }[]
  }[]
}

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllStudents: builder.query<studentsData, void>({
      query: () => "/v1/students",
      keepUnusedDataFor: 60
    })
  }),
})

export const { useGetAllStudentsQuery } = studentsApiSlice