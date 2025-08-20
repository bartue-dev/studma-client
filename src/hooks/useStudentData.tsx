import { useGetAllStudentsQuery } from "@/features/Student/StudentApiSlice";

type ApiError = {
  status: number,
  data: {
    message: string,
    stackTrace: string,
    status: number
  }
}
export default function useStudentData() {
  const { 
      data: students,
      isSuccess,
      isLoading,
      isError,
      error
    } = useGetAllStudentsQuery();

    //when request from the api have error
  const apiError = error as ApiError

  return { students, isSuccess, isLoading, isError, apiError}
}