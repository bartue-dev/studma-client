
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

import { Ellipsis } from "lucide-react";
import { EditStudentDataDialog } from "./EditStudentDataDialog";
import { useState } from "react";

type PropsType = {
  studentId: string
}

export function StudentsActions({studentId} : PropsType) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

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
            >
              Delete
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
