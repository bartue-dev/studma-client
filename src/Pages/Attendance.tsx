import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BeatLoader } from "react-spinners";

import { useGetAllStudentsQuery } from "@/features/Student/StudentApiSlice"
import { StatusCombobox } from "@/components/Common/StatusCombobox"

import LastSevenDays from "@/components/Common/Last7Days";

import { useAppDispatch } from "@/features/hooks";
import { addStudentData } from "@/features/Student/StudentSlice";
import { useAppSelector } from "@/features/hooks";
import { studentDataSlice } from "@/features/Student/StudentSlice";
import { useEffect } from "react";


//Attendance component
export default function Attendance() {
  const {
    data: studentsData,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllStudentsQuery();
  const dispatch = useAppDispatch();
  const students = useAppSelector(studentDataSlice)

  useEffect(() => {
    if (isSuccess) {
      dispatch(addStudentData(studentsData?.studentData))
    } else if (isError) {
      console.log(error)
    }
  },[dispatch, error , isError, isSuccess, studentsData])

  return (
    <div className="h-full">
      <h1 className="mb-8 text-3xl text-gray-800 font-semibold">Daily attendance</h1>
      <div className="border shadow-sm bg-white p-3 rounded-md">
        <Table className="w-full h-full">
          <TableCaption>List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>STUDENT NAME</TableHead>
              <TableHead className="text-center">GRADE</TableHead>
              <TableHead className="text-center">SECTION</TableHead>
              <TableHead>PREVIOUS 7 DAYS STATUS</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 justify-items-center">
                    <BeatLoader color="#5e9fe3"/>
                  </TableCell>
                </TableRow>
              : isSuccess
              && students?.studentData.map(student => (
                  <TableRow key={student.studentId}>
                    <TableCell 
                      className="font-medium"
                    >
                      {student.firstname} {student.lastname}
                    </TableCell>
                    <TableCell className="text-center"> {student.grade} </TableCell>
                    <TableCell className="text-center"> {student.section} </TableCell>
                    <TableCell>
                     <LastSevenDays attendanceDate={student?.attendanceDate}/>
                    </TableCell>
                    <TableCell>
                    <StatusCombobox 
                      attendanceDate={student?.attendanceDate}
                      studentId={student?.studentId}
                      />
                    </TableCell>
                  </TableRow>
                  ))} 
          </TableBody>
        </Table>
      </div>
    </div>
  )
}