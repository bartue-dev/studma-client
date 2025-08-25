import { useGetAllStudentsQuery } from "@/features/Student/StudentApiSlice";
import { useMemo } from "react";

type ApiError = {
  status: number,
  data: {
    message: string,
    stackTrace: string,
    status: number
  }
}


export default function useStudentData(selectGrade?: number, selectSection?: string)  {
  const { 
      data: allStudents,
      isSuccess,
      isLoading,
      isError,
      error
    } = useGetAllStudentsQuery();

    const students = useMemo(() => {
      if (!allStudents) {
        return []
      }

      if (!selectGrade && !selectSection) {
        return allStudents?.studentData
      }

      const filteredStudents = allStudents.studentData.filter(student => {
        const grades = selectGrade ? student.grade === selectGrade : true;
        const section = selectSection ? student.section === selectSection : true;

        return grades && section
      });
      
      return filteredStudents

    }, [allStudents, selectGrade, selectSection])

    //when request from the api have error
  const apiError = error as ApiError

  return { students, isSuccess, isLoading, isError, apiError}
}