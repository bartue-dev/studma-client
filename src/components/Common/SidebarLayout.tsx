import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="rounded-none px-5 md:hidden absolute top-4"/>
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}