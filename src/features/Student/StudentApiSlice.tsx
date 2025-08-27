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

type AddStudent = {
    firstname: string,
    lastname: string,
    grade: number,
    section: string,
    batch: string
}

type UpdateStudent = {
    studentId: string,
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

    addStudent: builder.mutation<addStudentResponse, AddStudent>({
      query: (data) => ({
        url: "/v1/students",
        method: "POST",
        body: {...data}
      }),
      invalidatesTags: ["Students"]
    }),

    updateStudent: builder.mutation<void, UpdateStudent>({
      query: (data) => ({
        url: `/v1/students/${data.studentId}`,
        method: "PUT",
        body: {...data}
      }),
      invalidatesTags: ["Students"]
    }),

    deleteStudent: builder.mutation<void, {studentId: string}>({
      query: (data) => ({
        url: `/v1/students/${data.studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"]
    }),

  })
})

export const { 
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} = studentsApiSlice