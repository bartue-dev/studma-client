import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAppSelector } from "@/features/hooks"
import { studentDataSlice } from "@/features/Student/StudentSlice"

export  default function FilterInputs() {
  const students = useAppSelector(studentDataSlice);

  // console.log("STUDENTS FROM FILTER INPUTS:", students)

  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
