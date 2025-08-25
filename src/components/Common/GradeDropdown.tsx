import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useStudentData from "@/hooks/useStudentData";

type PropsTypes = {
  setSelectGrade: (grade: number) => void
}

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function GradeDropDown({ setSelectGrade }: PropsTypes) {
  const {students} = useStudentData()
  const [grade, setGrade] = useState<number[]>([])

  useEffect(() => {
    if (grade.length === 0) {
      const mapGrade = students?.map(student => student.grade);
      setGrade([...new Set(mapGrade)].sort((a, b) => a - b))
    }
  }, [grade.length, students])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild 
        className="[&:focus]:outline-none [&:focus]:ring-0 [&[data-state=open]]:outline-none"
      >
        <Button 
          variant="ghost"
          className="cursor-pointer"
        >
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="start">
        <DropdownMenuLabel>Grades</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => setSelectGrade(0)}
          >
            All grades
          </DropdownMenuItem>
          {grade?.map((grade, i) => (
            <DropdownMenuItem 
              key={i}
              onSelect={() => setSelectGrade(grade)}
            >
              {grade}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
