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
    totalAbsent: number,
    totalPresent: number,
    attendanceDate: {
      attendanceDateId: string,
      date: string,
      status: string
    }[]
  }[]
}

type addStudentResponse = {
  status: string,
  message: string,
  studentData: {
    studentId: string,
    firstname: string,
    lastname: string,
    grade: number,
    section: string,
    batch: string,
    createdAt: string,
    updatedAt: string,
    accountId: string
  }
}

type addStudent = {
    firstname: string,
    lastname: string,
    grade: number,
    section: string,
    batch: string
}
export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllStudents: builder.query<studentsData, void>({
      query: () => "/v1/students",
      keepUnusedDataFor: 60,
      providesTags: ['Students']
    }),

    addStudent: builder.mutation<addStudentResponse, addStudent>({
      query: (data) => ({
        url: "/v1/students",
        method: "POST",
        body: {...data}
      }),
      invalidatesTags: ["Students"]
    }),
  })
})

export const { 
  useGetAllStudentsQuery,
  useAddStudentMutation
} = studentsApiSlice