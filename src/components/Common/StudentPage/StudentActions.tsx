
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { useDeleteStudentMutation } from "@/features/Student/StudentApiSlice";
import { Ellipsis, LoaderCircle } from "lucide-react";
import { EditStudentDataDialog } from "./EditStudentDataDialog";
import { useState } from "react";

type PropsType = {
  studentId: string
}

export function StudentsActions({studentId} : PropsType) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [deleteStudent, {isLoading: deleteLoading}] = useDeleteStudentMutation();
  
    const handleDeleteStudent = async () => {
      try {
        await deleteStudent({
          studentId
        }).unwrap();
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild
          className="[&:focus]:outline-none [&:focus]:ring-0 [&[data-state=open]]:outline-none"
        >
          <Button 
            variant="ghost"
            className="cursor-pointer"
          >
            <Ellipsis/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20" align="start">
          <DropdownMenuLabel >Actions</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                setEditDialogOpen(true)
                /* this piece of code fixes a bug where the edit dialog is open you cant click anywhere */
                document.body.style.pointerEvents = "" 
              }}
            >
              Edit 
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                handleDeleteStudent();
              }}
            >
              Delete
              {deleteLoading && <LoaderCircle className="animate-spin"/>}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Student Data Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <EditStudentDataDialog
          setEditDialogOpen={setEditDialogOpen}
          studentId={studentId}
        />
      </Dialog>
    </div>
  )
}
