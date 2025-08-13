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


export default function Attendance() {
  const {
    data: studentsData,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllStudentsQuery();

  if (isError) {
    console.log(error)
  }

  return (
    <div className="h-full">
      <h1 className="mb-8 text-3xl text-gray-800 font-semibold">Daily attendance</h1>
      <div className="border shadow-sm bg-white p-3 rounded-md">
        <Table className="w-full h-full">
          <TableCaption>List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">STUDENT NAME</TableHead>
              <TableHead className="">PREVIOUS 7 DAYS STATUS</TableHead>
              <TableHead >STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 justify-items-center">
                    <BeatLoader color="#5e9fe3"/>
                  </TableCell>
                </TableRow>
              : isSuccess
              && studentsData?.studentData.map(student => (
                  <TableRow key={student.studentId}>
                    <TableCell 
                      className="font-medium"
                    >
                      {student.firstname} {student.lastname}
                    </TableCell>
                    <TableCell>
                     <LastSevenDays attendanceDate={student?.attendanceDate}/>
                      {/* {student?.attendanceDate.map(attendance => (
                        <div key={attendance.attendanceDateId}>
                          <h1>{attendance.date}</h1>
                          <h1>{attendance.status}</h1>
                        </div>
                      ))} */}
                    </TableCell>
                    <TableCell>
                    <StatusCombobox attendanceDate={student?.attendanceDate}/>
                    </TableCell>
                  </TableRow>
                  ))} 
          </TableBody>
        </Table>
      </div>
    </div>
  )
}