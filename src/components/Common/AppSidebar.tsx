import { CalendarDays, ListChecks , GraduationCap , NotebookPen , Signpost , LogOut, NotebookText   } from "lucide-react"

import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useLogoutMutation } from "@/features/Auth/authApiSlice";
import { useAppDispatch } from "@/features/hooks";
import { logOut } from "@/features/Auth/authSlice";

// Menu items.
const items = [
  {
    title: "Attendance",
    url: "/home/attendance",
    icon: ListChecks,
  },
  {
    title: "Students",
    url: "/home/students",
    icon: GraduationCap ,
  },
  {
    title: "Batch",
    url: "/home/batch",
    icon: CalendarDays,
  },
  {
    title: "Course",
    url: "/home/course",
    icon: NotebookPen ,
  },
  {
    title: "Sections",
    url: "/home/section",
    icon: Signpost ,
  },
]

export function AppSidebar() {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  }

  return (
    <Sidebar>
      <SidebarHeader 
        className="bg-sky-600 text-white text-xl font-bold h-16 px-4"
      >
       <div className="flex items-center gap-2 h-full">
         <NotebookText />
          STUDMA
       </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800 text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex fexl-col justify-center gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-base">
                    <Link to={item.url}>
                      <item.icon style={{ width: '20px', height: '20px' }} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-800 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="cursor-pointer text-base"
            >
              <LogOut style={{ width: '20px', height: '20px' }} />
              <span
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}