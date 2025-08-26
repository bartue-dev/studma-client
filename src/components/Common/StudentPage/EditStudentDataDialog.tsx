import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useStudentData from "@/hooks/useStudentData"

import { useEffect, useState } from "react"

type PropsType = {
  setEditDialogOpen: (editDialogOpen: boolean) => void
  studentId: string
}

type CurrentStudentType = {
    studentId: string,
    firstname: string,
    lastname: string,
    grade: number,
    section: string,
    batch: string,
    createdAt: string,
    updatedAt: string,
    accountId: string
}

export function EditStudentDataDialog({setEditDialogOpen, studentId} : PropsType) {
  const { 
    students,
    isSuccess,
    isLoading,
    isError,
    apiError
   } = useStudentData({})
  const [currentStudent, setCurrentStudent] = useState<CurrentStudentType | undefined>(undefined)
  

   useEffect(() => {
    if (isSuccess) {
    // console.log(students)
    const findStudent = students.find(student => student.studentId === studentId)
    setCurrentStudent(findStudent)
   } else if (isLoading) {
      console.log(currentStudent)
   } else if (isError) {
    console.log(apiError)
   }
   },[apiError, currentStudent, isError, isLoading, isSuccess, students, studentId])


   useEffect(() => {
    console.log("currentStudent state",currentStudent)
   },[currentStudent])

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 mt-5">
          <div className="grid gap-1">
            <label htmlFor="firstname">Firstname</label>
            <Input id="firstname" name="firstname" defaultValue={currentStudent?.firstname} />
          </div>
          <div className="grid gap-1">
            <label htmlFor="lastname">Lastname</label>
            <Input id="lastname" name="lastname" defaultValue={currentStudent?.lastname} />
          </div>
           <div className="grid gap-1">
            <label htmlFor="grade">Grade</label>
            <Input id="grade" name="grade" defaultValue={currentStudent?.grade} />
          </div>
           <div className="grid gap-1">
            <label htmlFor="section">Section</label>
            <Input id="section" name="section" defaultValue={currentStudent?.section} />
          </div>
           <div className="grid gap-1">
            <label htmlFor="batch">Batch</label>
            <Input id="batch" name="batch" defaultValue={currentStudent?.batch} />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>

  )
}
