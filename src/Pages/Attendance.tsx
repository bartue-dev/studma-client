import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BeatLoader } from "react-spinners";

import useStudentData from "@/hooks/useStudentData";
import { StatusCombobox } from "@/components/Common/StatusCombobox"

import LastSevenDays from "@/components/Common/Last7Days";

import { format } from "date-fns";

//Attendance component
export default function Attendance() {
  const {
    students,
    isSuccess,
    isLoading,
    isError,
    apiError
  } = useStudentData();

  return (
    <div className="h-full">
        <h1 className="text-3xl text-gray-800 font-semibold mb-8">Daily attendance:</h1>
      <div 
        className="border shadow-sm bg-white p-3 rounded-md h-[500px] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">STUDENT NAME</TableHead>
              <TableHead className="text-center">GRADE</TableHead>
              <TableHead className="text-center">SECTION</TableHead>
              <TableHead>PREVIOUS 7 DAYS STATUS ({format(new Date(), "MMMM")})</TableHead>
              <TableHead>STATUS ({format(new Date(), "MMM-dd")})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 justify-items-center">
                    <BeatLoader color="#5e9fe3"/>
                  </TableCell>
                </TableRow>
              :isError
              ? <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  {apiError.data.message}
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