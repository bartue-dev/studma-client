import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type PropsTypes = {
  date: Date | undefined,
  setDate: (date: Date | undefined) => void
}

export function AttendanceDatePicker({date, setDate}: PropsTypes) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />

          {date 
            && <Button
                variant="ghost"
                className="cursor-pointer border-t-1 rounded-none w-full hover:bg-red-500 hover:text-white"
                onClick={() => {
                  setOpen(false)
                  setDate(undefined)
                }}
              >
                Reset Date
              </Button>}
          
        </PopoverContent>
      </Popover>
    </div>
  )
}
