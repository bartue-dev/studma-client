import { ListChecks , GraduationCap , LogOut, NotebookText   } from "lucide-react"

import { Link, useLocation } from "react-router-dom"

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
]

export function AppSidebar() {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;


  const handleLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  }

  return (
    <Sidebar>
      <SidebarHeader 
        className="text-xl font-bold h-16 px-4 bg-white"
      >
       <div className="flex items-center gap-2 w-fit h-full">
         <NotebookText className="text-purple-500"/>
         <h1 className="text-purple-500">STUDMA</h1>
       </div>
      </SidebarHeader>
      <SidebarContent className="bg-white border-b-1 border-t-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex fexl-col justify-center gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`text-base p-5 rounded-l-none 
                      ${pathname === item.url && "bg-purple-500 text-white hover:bg-purple-500 hover:text-white"}`}>
                    <Link to={item.url}>
                      <item.icon 
                        style={{ width: '20px', height: '20px' }} 
                        className={`text-gray-600 ${pathname === item.url && "text-white"}`}/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="cursor-pointer text-base p-5"
            >
              <LogOut style={{ width: '20px', height: '20px' }} className="text-gray-600" />
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