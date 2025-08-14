import { apiSlice } from "../api/api";

type attendanceResponse = {
  attendanceData: {
    attendanceDateId: string,
    date: string,
    status: string
  }[]
}

type attendanceArgs = {
  attendanceDateId: string,
  date: string,
  status: string
}

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateAttendance: builder.mutation<attendanceResponse, attendanceArgs>({
      query: ({attendanceDateId, date, status}) => ({
        url: `/v1/attendanceDate${attendanceDateId}`,
        method: "PUT",
        body: {date, status}
      })
    })
  })
})

export const { useUpdateAttendanceMutation } = attendanceApiSlice