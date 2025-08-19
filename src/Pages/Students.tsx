import AddStudentDialog from "@/components/Common/AddStudentDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { studentDataSlice } from "@/features/Student/StudentSlice"
import { useAppSelector } from "@/features/hooks"

export default function Students() {
  const students = useAppSelector(studentDataSlice);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl text-gray-800 font-semibold">Students:</h1>
        <AddStudentDialog/>
      </div>
      <div className="border shadow-sm bg-white p-3 rounded-md">
        <Table className="w-full h-full">
          <TableCaption>List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">STUDENT NAME</TableHead>
              <TableHead className="text-center">GRADE</TableHead>
              <TableHead className="text-center">SECTION</TableHead>
              <TableHead className="text-center">TOTAL ABSENCES</TableHead>
              <TableHead className="text-center">TOTAL PRESENT DAYS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.studentData.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell className="font-medium">{student.firstname} {student.lastname}</TableCell>
                <TableCell className="text-center">{student.grade}</TableCell>
                <TableCell className="text-center">{student.section}</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}