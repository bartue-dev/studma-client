import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Plus, LoaderCircle } from "lucide-react";

import { useAddStudentMutation } from "@/features/Student/StudentApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useState } from "react";

const AddStudentSchema = z.object({
  firstname: z.string("Firstname must be a string").min(2, "Firstname must be atleast 2 or more characters"),
  lastname: z.string("Lastname must be a string").min(2, "Lastname must be atleast 2 or more characters"),
  grade: z.int("Grade must be a integer"),
  section: z.string("Section must be a string").min(1, "Section must not be empty"),
  batch: z.string().regex(/\d{4}-\d{4}/, "Invalid batch")
});

type AddStudentData = z.infer<typeof AddStudentSchema>

//AddStudentDialog component
export default function AddStudentDialog() {
  const [open,setOpen] = useState(false);
  const [serverError, setServerError] = useState<{error?: string}>({})
  const { 
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<AddStudentData>({
    resolver: zodResolver(AddStudentSchema)
  });

  const [addStudent, {isLoading}] = useAddStudentMutation();

  //add student data function/submit
  const onSubmit = async(data: AddStudentData) => {
    console.log("GRADE", data.grade)
    try {
      await addStudent({
        firstname: data.firstname,
        lastname: data.lastname,
        grade: Number(data.grade),
        section: data.section,
        batch: data.batch
      }).unwrap();

      if(!isLoading) {
        setOpen(false)
      }
    } catch (err) {
      console.error("catch error",err)

      const error = err as {status: number, data: { message: string}}
      const serveError = {} as { error: string }

      if (!error?.status) {
        serveError.error = "No server response"
      } else if (error?.data?.message.split(":")[0] === "P2002") {
        serveError.error = "Student already exist"
      } else if (error?.status === 400) {
        serveError.error = "Failed to add a student"
      } else {
        serveError.error = "Failed"
      }

      if (Object.keys(serveError).length > 0) {
        setServerError(serveError)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
        variant="outline"
        className="cursor-pointer hover:bg-white"
      >
        <Plus className="text-gray-600 w-4"/>
        <span className="text-sm text-gray-800">Add student</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Student</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 mt-5">
             {serverError && <p className="text-sm text-red-600">{serverError?.error}</p>}
            <div className="grid gap-1">
              <label htmlFor="firstname">Firstname</label>
              <Input 
                type="text" 
                id="firstname" 
                {...register("firstname")}
              />
              {errors?.firstname && <p className="text-xs text-red-500">{errors?.firstname?.message}</p>}
            </div>
            <div className="grid gap-1">
              <label htmlFor="lastname">Lastname</label>
              <Input 
                type="text" 
                id="lastname" 
                {...register("lastname")}
              />
              {errors?.lastname && <p className="text-xs text-red-500">{errors?.lastname?.message}</p>}
            </div>
            <div className="grid gap-1">
              <label htmlFor="grade">Grade</label>
              <Input 
                type="number" 
                id="grade" 
                {...register("grade", { valueAsNumber: true })}
              />
              {errors?.grade && <p className="text-xs text-red-500">{errors?.grade?.message}</p>}
            </div>
            <div className="grid gap-1">
              <label htmlFor="section">Section</label>
              <Input 
                type="text" 
                id="section" 
                {...register("section")}
              />
              {errors?.section && <p className="text-xs text-red-500">{errors?.section?.message}</p>}
            </div>
            <div className="grid gap-1">
              <label htmlFor="batch">Batch</label>
              <Input 
                type="text" 
                id="batch" 
                {...register("batch")}
              />
              {errors?.batch && <p className="text-xs text-red-500">{errors?.batch?.message}</p>}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button 
                variant="outline"
                className="cursor-pointer"
                onClick={() => reset()}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              { isLoading && <LoaderCircle className="animate-spin"/> }
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
