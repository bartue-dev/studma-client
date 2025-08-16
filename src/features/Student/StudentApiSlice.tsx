import { apiSlice } from "../api/api";

type studentsData = {
  studentData: {
    studentId: string,
    firstname: string,
    lastname: string,
    createdAt: string,
    updatedAt: string,
    accountId: string,
    grade: number,
    section: string,
    batch: string,
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
      keepUnusedDataFor: 60,
      providesTags: ['Students']
    })
  })
})

export const { useGetAllStudentsQuery } = studentsApiSlice