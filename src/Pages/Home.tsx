import { Outlet } from "react-router-dom";
import SidebarLayout from "../components/Common/SidebarLayout";

export default function Home() {
  return(
    <div>
      <SidebarLayout>
        <div>
          <Outlet/>
        </div>
      </SidebarLayout>
    </div>
  )
}