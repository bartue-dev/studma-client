import { Outlet } from "react-router-dom";
import SidebarLayout from "../components/Common/SidebarLayout";
import { useAppSelector } from "@/features/hooks";
import { selectCurrentUser } from "@/features/Auth/authSlice";

import { User, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export default function Home() {
  const fullname = useAppSelector(selectCurrentUser);

  return(
    <div className="font-Sans h-screen">
      <SidebarLayout>
        <div className="flex flex-col h-full bg-gray-50">

          {/* header */}
          <div 
            className="h-16 px-10 flex items-center justify-between"
          >
            <div className="relative">
              <Search size={20} className="text-gray-600 absolute left-2 top-2"/>
              <Input 
                type="text"
                name="search"
                placeholder="Search student by name"
                className="w-80 bg-white shadow-none pl-8"
              />
            </div>
            <div className="flex items-center gap-3">
              <span>Hi, Ma'am {fullname?.split(" ")[0]}</span>
              <User size={25} className="text-gray-500"/>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 p-8">
            <Outlet/>
          </div>
        </div>
      </SidebarLayout>
    </div>
  )
}