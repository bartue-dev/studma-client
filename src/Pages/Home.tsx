import { Outlet } from "react-router-dom";
import SidebarLayout from "../components/Common/SidebarLayout";
import { useAppSelector } from "@/features/hooks";
import { selectCurrentUser } from "@/features/Auth/authSlice";

import { User } from 'lucide-react';

export default function Home() {
  const fullname = useAppSelector(selectCurrentUser);

  return(
    <div className="font-Sans h-screen">
      <SidebarLayout>
        <div className="flex flex-col h-full bg-gray-50 relative">

          {/* header */}
          <div className="h-16 px-10 content-center absolute top-0 right-0">
            <div className="flex items-center gap-3 ">
              <span>Hi, Teacher {fullname?.split(" ")[0]}</span>
              <User size={25} className="text-gray-500"/>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 p-8 mt-8">
            <Outlet/>
          </div>
        </div>
      </SidebarLayout>
    </div>
  )
}