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
import { GradeDropDown } from "@/components/Common/GradeDropdown";
import { useState } from "react";
import { SectionDropDown } from "@/components/Common/SectionDropDown";
import { AttendanceDatePicker } from "@/components/Common/AttendanceDatePicker";

//Attendance component
export default function Attendance() {
  const [selectGrade, setSelectGrade] = useState(0);
  const [selectSection, setSelectSection] = useState("");
  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined)
  const {
    students,
    isSuccess,
    isLoading,
    isError,
    apiError
  } = useStudentData({selectGrade, selectSection, selectDate});

  // console.log("STUDENTS", students)

  return (
    <div className="h-full">
      <div className="flex items-center gap-5 mb-8">
        <h1 className="text-3xl text-gray-800 font-semibold">Attendance:</h1>
        <AttendanceDatePicker
          date={selectDate}
          setDate={setSelectDate}
        />
      </div>
      <div 
        className="border shadow-sm bg-white p-3 rounded-md h-[500px] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">STUDENT NAME</TableHead>
              <TableHead>
                <div className="flex items-center justify-center gap-2">
                  <span>GRADE</span>
                  <GradeDropDown
                    setSelectGrade={setSelectGrade}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-center gap-2">
                  <span>SECTION</span>
                  <SectionDropDown
                    setSelectSection={setSelectSection}
                  />  
                </div>
              </TableHead>
              <TableHead>PREVIOUS 7 DAYS STATUS</TableHead>
              <TableHead>
                STATUS 
                ({selectDate 
                  ? format(selectDate, "MMM-dd") 
                  : format(new Date(), "MMM-dd")})
              </TableHead>
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
              && students?.map(student => (
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
                      date={selectDate}
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