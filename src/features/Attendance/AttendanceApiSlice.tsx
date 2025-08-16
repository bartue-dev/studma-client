  import { apiSlice } from "../api/api";

  type AddAttendanceResponse = {
    attendanceData: {
      attendanceDateId: string | null,
      date: string | null,
      status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
    }[]
  }

  type AddAttendanceArgs = {
    studentId: string | null,
    date: string | null,
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
  }

  type updateAttendanceResponse = {
    attendanceDate: {
      attendanceDateId: string | null,
      status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
    }[]
  }

  type UpdateAttendanceArgs = {
    attendanceDateId: string | null | undefined,
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
  }


  export const attendanceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      addAttendance: builder.mutation<AddAttendanceResponse, AddAttendanceArgs>({
        query: (data) => ({
          url: `/v1/attendanceDate/student/${data.studentId}`,
          method: "POST",
          body: {
            date: data.date,
            status: data.status
          }
        }),
        invalidatesTags: ["Students"]
      }),

      updateAttendance: builder.mutation<updateAttendanceResponse, UpdateAttendanceArgs>({
        query: ({attendanceDateId, status}) => ({
          url: `/v1/attendanceDate/${attendanceDateId}`,
          method: "PUT",
          body: { status }
        }),
        invalidatesTags: ["Students"]
      })
    })
  })

  export const { 
    useUpdateAttendanceMutation,
    useAddAttendanceMutation
  } = attendanceApiSlice