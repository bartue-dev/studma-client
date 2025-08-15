  import { apiSlice } from "../api/api";

  type AddAttendanceResponse = {
    attendanceData: {
      attendanceDateId: string,
      date: string,
      status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
    }[]
  }

  type AddAttendanceArgs = {
    studentId: string | null,
    date: string,
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
  }

  type updateAttendanceResponse = {
    attendanceDate: {
      attendanceDateId: string,
      date: string,
      status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
    }[]
  }

  type UpdateAttendanceArgs = {
    attendanceDateId: string,
    date: string,
    status: string
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
        })
      }),

      updateAttendance: builder.mutation<updateAttendanceResponse, UpdateAttendanceArgs>({
        query: ({attendanceDateId, date, status}) => ({
          url: `/v1/attendanceDate/${attendanceDateId}`,
          method: "PUT",
          body: {date, status}
        })
      })
    })
  })

  export const { 
    useUpdateAttendanceMutation,
    useAddAttendanceMutation
  } = attendanceApiSlice