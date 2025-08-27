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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUpdateStudentMutation } from "@/features/Student/StudentApiSlice"
import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { BeatLoader } from "react-spinners"

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

const UpdateStudentSchema = z.object({
  firstname: z.string("Firstname must be a string").min(2, "Firstname must be atleast 2 or more characters"),
  lastname: z.string("Lastname must be a string").min(2, "Lastname must be atleast 2 or more characters"),
  grade: z.int("Grade must be a integer"),
  section: z.string("Section must be a string").min(1, "Section must not be empty"),
  batch: z.string().regex(/\d{4}-\d{4}/, "Invalid batch")
});

type UpdateStudentData = z.infer<typeof UpdateStudentSchema>

export function EditStudentDataDialog({setEditDialogOpen, studentId} : PropsType) {
  const { 
    students,
    isSuccess,
    isLoading,
    isError,
    apiError
   } = useStudentData({})
  const [currentStudent, setCurrentStudent] = useState<CurrentStudentType | undefined>(undefined)
  const [serverError, setServerError] = useState<{error?: string}>({})
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UpdateStudentData>({
    resolver: zodResolver(UpdateStudentSchema)
  });
  const [updateStudent, {isLoading: updateLoading}] = useUpdateStudentMutation()
  
  //update student data/submit
  const onSubmit = async(data: UpdateStudentData) => {
    console.log("STUDENT ID:", studentId)
    try {
      await updateStudent({
        studentId: studentId,
        firstname: data.firstname,
        lastname: data.lastname,
        grade: Number(data.grade),
        section: data.section,
        batch: data.batch
      }).unwrap();

      if (!updateLoading) {
        setEditDialogOpen(false)
      }
    } catch (err) {
      console.error(err)
      const error = err as {
        status: number,
        data: {message: string}
      }
      const serverError = {} as {error: string}

      if (!error?.status) {
        serverError.error = "No server response"
      } else if (error?.data?.message.split(":")[0] === "P2002") {
        serverError.error = "Student already exist"
      } else if (error?.status === 400) {
        serverError.error = "Failed to update student data"
      } else {
        serverError.error = "Failed"
      }

      if (Object.keys(serverError).length > 0) {
        setServerError(serverError)
      }
    }
  }

  //find the specific student save it to the state then render to the inputs as default values 
   useEffect(() => {
    if (isSuccess) {
    // console.log(students)
    const findStudent = students.find(student => student.studentId === studentId)
    setCurrentStudent(findStudent)
   } else if (isError) {
    console.log(apiError)
   }
   },[apiError, currentStudent, isError, isLoading, isSuccess, students, studentId])

   //RTK isLoading
   if (isLoading) {
    return (
      <div>
        <BeatLoader/>
      </div>
    )
   }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 mt-5">
          {serverError && <p className="text-sm text-red-600">{serverError?.error}</p>}
          <div className="grid gap-1">
            <label htmlFor="firstname">Firstname</label>
            <Input 
              type="text"
              id="firstname" 
              {...register("firstname")} 
              defaultValue={currentStudent?.firstname} 
            />
            {errors?.firstname && <p className="text-sm text-red-600">{errors?.firstname?.message}</p>}
          </div>
          <div className="grid gap-1">
            <label htmlFor="lastname">Lastname</label>
            <Input 
              type="text"
              id="lastname" 
              {...register("lastname")}
              defaultValue={currentStudent?.lastname} 
            />
            {errors?.lastname && <p className="text-sm text-red-600">{errors?.lastname?.message}</p>}
          </div>
           <div className="grid gap-1">
            <label htmlFor="grade">Grade</label>
            <Input 
              type="number"
              id="grade" 
              {...register("grade", {valueAsNumber: true})}
              defaultValue={currentStudent?.grade}
            />
            {errors?.grade && <p className="text-sm text-red-600">{errors?.grade?.message}</p>}
          </div>
           <div className="grid gap-1">
            <label htmlFor="section">Section</label>
            <Input 
              type="text"
              id="section" 
              {...register("section")} 
              defaultValue={currentStudent?.section}
            />
            {errors?.section && <p className="text-sm text-red-600">{errors?.section?.message}</p>}
          </div>
           <div className="grid gap-1">
            <label htmlFor="batch">Batch</label>
            <Input 
              type="text"
              id="batch" 
              {...register("batch")} 
              defaultValue={currentStudent?.batch} 
            />
            {errors?.batch && <p className="text-sm text-red-600">{errors?.batch?.message}</p>}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="submit"
            disabled={updateLoading}
          >
            { updateLoading && <LoaderCircle className="animate-spin"/>}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>

  )
}
