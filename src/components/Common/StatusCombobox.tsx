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

type StatusComboboxProps = {
  attendanceDate:  {
    attendanceDateId: string,
    date: string,
    status: string
  }[]
}

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
const getStatusStyling = (status: string) => {
  switch (status) {
    case "PRESENT":
      return "bg-green-500 text-white hover:bg-green-500 hover:-translate-y-0.5 transition-all duration-150 hover:text-white";
    case "ABSENT":
      return "bg-red-500 text-white hover:bg-red-500 hover:-translate-y-0.5 transition-all duration-150 hover:text-white";
    case "LATE":
      return "bg-yellow-500 text-white hover:bg-yellow-500 hover:-translate-y-0.5 transition-all duration-150 hover:text-white";
    case "EXCUSE":
      return "bg-blue-500 text-white hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-150 hover:text-white";
    default:
      return "hover:bg-gray-100 hover:shadow-md hover:border-gray-300 transition-all duration-200";
  }
}

export function StatusCombobox({ attendanceDate }: StatusComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

  /* 
    take date now
    loop through attendanceDate to find the date now
    if so take take the status
    then update the status
  */

  React.useEffect(() => {
    const dateNow = new Date();
    const currentDate = format(dateNow, "yyyy-MM-dd");

    const attendance = attendanceDate.filter(attendance => attendance.date === currentDate);

    setValue(attendance[0]?.status);
  }, [attendanceDate])

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
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false);
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
