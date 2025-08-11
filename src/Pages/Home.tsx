import { Outlet } from "react-router-dom";
import SidebarLayout from "../components/Common/SidebarLayout";
import { useAppSelector } from "@/features/hooks";
import { selectCurrentUser } from "@/features/Auth/authSlice";

export default function Home() {
  const fullname = useAppSelector(selectCurrentUser);

  return(
    <div className="font-Sans">
      <SidebarLayout>
        <div>
          <div className="py-4 bg-gray-100">{fullname}</div>
          <Outlet/>
        </div>
      </SidebarLayout>
    </div>
  )
}