import AddStudentDialog from "@/components/Common/AddStudentDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BeatLoader } from "react-spinners";
import { Ellipsis } from "lucide-react";

import useStudentData from "@/hooks/useStudentData";

export default function Students() {
  const { 
    students,
    isSuccess,
    isLoading,
    isError,
    apiError
  } = useStudentData();

  console.log("STUDENTS COMPONENT",students)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl text-gray-800 font-semibold">Students:</h1>
        <AddStudentDialog/>
      </div>
      <div 
        className="border shadow-sm bg-white p-3 rounded-md h-[480px] overflow-auto"
        style={{ scrollbarWidth: "thin"}}
      >
        <Table className="w-full h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">STUDENT NAME</TableHead>
              <TableHead className="text-center">GRADE</TableHead>
              <TableHead className="text-center">SECTION</TableHead>
              <TableHead className="text-center">TOTAL ABSENCES</TableHead>
              <TableHead className="text-center">TOTAL PRESENT DAYS</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 justify-items-center">
                    <BeatLoader color="#5e9fe3"/>
                  </TableCell>
                </TableRow>
              : isError
                ? <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-red-500">
                    {apiError.data.message}
                  </TableCell>
                </TableRow>
              : isSuccess
              && students?.studentData.map((student) => (
                <TableRow 
                  key={student.studentId}
                  className="h-15"
                >
                  <TableCell className="font-medium">{student.firstname} {student.lastname}</TableCell>
                  <TableCell className="text-center">{student.grade}</TableCell>
                  <TableCell className="text-center">{student.section}</TableCell>
                  <TableCell 
                    className="text-center font-semibold text-red-500"
                    >
                      {student.totalAbsent.toString().padStart(2, "0")}
                    </TableCell>
                  <TableCell 
                    className="text-center font-semibold text-green-600"
                    >
                      {student.totalPresent.toString().padStart(2, "0")}
                    </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Ellipsis />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}