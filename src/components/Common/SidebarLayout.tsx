import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full">
        <div className="bg-gray-50">
          <SidebarTrigger className="top-4 text-gray-700"/>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}