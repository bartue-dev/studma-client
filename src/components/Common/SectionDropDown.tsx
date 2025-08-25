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
  setSelectSection: (grade: string) => void
}

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function SectionDropDown({ setSelectSection }: PropsTypes) {
  const {students} = useStudentData()
  const [section, setSection] = useState<string[]>([])

  useEffect(() => {
    if (section.length === 0) {
      const mapSection = students?.map(student => student.section);
      setSection([...new Set(mapSection)].sort())
    }
  }, [section.length, students])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild 
        className="[&:focus]:outline-none [&:focus]:ring-0 [&[data-state=open]]:outline-none"
      >
        <Button 
          variant="ghost"
        >
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="start">
        <DropdownMenuLabel>Grades</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => setSelectSection("")}
          >
            All section
          </DropdownMenuItem>
          {section?.map((section, i) => (
            <DropdownMenuItem 
              key={i}
              onSelect={() => setSelectSection(section)}
            >
              {section}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
