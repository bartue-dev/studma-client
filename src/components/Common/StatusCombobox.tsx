import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useAddAttendanceMutation, useUpdateAttendanceMutation } from "@/features/Attendance/AttendanceApiSlice"
import z from "zod"


type StatusComboboxProps = {
  studentId: string | null,
  attendanceDate:  {
    attendanceDateId: string | null,
    date: string | null,
    status: string | null
  }[],
  date: Date | undefined
}

const StatusValues = ["PRESENT", "ABSENT", "LATE", "EXCUSE"] as const;

const UpdateSchema = z.object({
  message: z.string(),
  status: z.string(),
  attendanceDate: z.object({
    accountId: z.string(),
    studentId: z.string(),
    attendanceDateId: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    status: z.enum(StatusValues, "Invalid Status")
  }).optional()
})

const frameworks = [
  {
    value: "PRESENT",
    label: "PRESENT",
  },
  {
    value: "ABSENT",
    label: "ABSENT",
  },
  {
    value: "LATE",
    label: "LATE",
  },
  {
    value: "EXCUSE",
    label: "EXCUSE",
  }
]

// Helper function to get status styling
const getStatusStyling = (status: string | null | undefined) => {
  switch (status) {
    case "PRESENT":
      return "bg-green-500 text-white hover:bg-green-500 hover:text-white";
    case "ABSENT":
      return "bg-red-500 text-white hover:bg-red-500 hover:text-white";
    case "LATE":
      return "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white";
    case "EXCUSE":
      return "bg-blue-500 text-white hover:bg-blue-500 hover:text-white";
    default:
      return "hover:bg-gray-100 hover:shadow-md hover:text-white";
  }
}

//statusCombobox component
export function StatusCombobox({ studentId, attendanceDate, date }: StatusComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string | null | undefined>(null);

  const [updateAttendance] = useUpdateAttendanceMutation()
  const [addAttendance] = useAddAttendanceMutation();

  React.useEffect(() => {
    const dateNow = new Date();
    const targetDate = date ? format(date, "yyyy-MM-dd") :format(dateNow, "yyyy-MM-dd");
    
    const attendance = attendanceDate.find(attendance => attendance.date === targetDate);
    
    setValue(attendance?.status);
    console.log("VALUE:", value)

  }, [attendanceDate, value, date]);


  const handleOnSelect = async(newStatus: string) => {
    const dateNow = new Date();
    const currentDate = format(dateNow, "yyyy-MM-dd");
    const attendance = attendanceDate.find(attendance => attendance.date === currentDate);


    try {
      let attendanceData;

      if (value === null || value === undefined) {
        console.log("ADD ATTENDANCE")
        attendanceData = await addAttendance({
          studentId: studentId,
          date: currentDate,
          status: newStatus as "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
        }).unwrap();

      } else {
        console.log("UPDATE ATTENDANCE")
        attendanceData = await updateAttendance({
          attendanceDateId: attendance?.attendanceDateId,
          status: newStatus as "PRESENT" | "ABSENT" | "LATE" | "EXCUSE"
        }).unwrap();
      }

      const result = UpdateSchema.safeParse(attendanceData);

      console.log(attendanceData)

      if(result.success) {
        console.log("UPDATED ATTENDANCE:", result.data)
        return
      } else if (result.error) {
        console.log("ERROR:", result.error)
        return null
      }
        
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[150px] justify-between cursor-pointer
             ${getStatusStyling(value)} `}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select status"}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    setValue(newValue)
                    setOpen(false);

                    handleOnSelect(newValue)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
