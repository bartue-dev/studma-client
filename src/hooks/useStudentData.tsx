import { useGetAllStudentsQuery } from "@/features/Student/StudentApiSlice";
import { useMemo } from "react";
import { format } from "date-fns";

type ApiError = {
  status: number,
  data: {
    message: string,
    stackTrace: string,
    status: number
  }
}

type ArgsTypes = {
  selectGrade?: number,
  selectSection?: string,
  selectDate?: Date | undefined,
  studentName?: string
}


export default function useStudentData({
    selectGrade,
    selectSection,
    selectDate,
    studentName
} : ArgsTypes)  {
  const { 
      data: allStudents,
      isSuccess,
      isLoading,
      isError,
      error
    } = useGetAllStudentsQuery();
    const formatedDate: string = selectDate ? format(selectDate, "yyyy-MM-dd") : "Select date"

    const students = useMemo(() => {
      if (!allStudents) {
        return []
      }

      if (!selectGrade &&
          !selectSection &&
          !selectDate &&
          !studentName
        ) {
        return allStudents?.studentData
      }

      const filteredStudents = allStudents.studentData.filter(student => {
        const grades = selectGrade ? student.grade === selectGrade : true;
        const section = selectSection ? student.section === selectSection : true;
        const date = selectDate 
                    ? student?.attendanceDate.find(attendance => attendance.date === formatedDate) 
                    : true

        const fullname = student.firstname + " " + student.lastname  
        const name = studentName 
                    ? fullname.toLocaleLowerCase().includes(studentName.toLocaleLowerCase()) 
                    : true
        
        return grades && section && date && name
      });
      
      return filteredStudents

    }, [allStudents, selectGrade, selectSection, selectDate, formatedDate, studentName])

    //when request from the api have error
  const apiError = error as ApiError

  return { students, isSuccess, isLoading, isError, apiError}
}