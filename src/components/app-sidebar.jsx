import * as React from "react"
import { SearchWithMic } from "./SearchWithMic"
// import { Mic } from "lucide-react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Wallet ,
  Mic ,
  GraduationCap
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/NavUser.jsx"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


 const data = {
  user: {
    name: "Vikash",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    
    {
      name: "MyLeading Campus",
      logo: AudioWaveform,
      plan: "Startup",
    },
    
  ],
  navMain: [
    {
      title: "Student Management",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Add Student",
          url: "/add-student",
        },
        {
          title: "Edit Student",
          url: "/edit-student",
        },
        {
          title: "View reports",
          url: "/view-reports",
        },
        {
          title: "Promote Students",
          url: "/promote",
        },
      ],
    },
    {
      title: "Fees Management",
      url: "#",
      icon: Wallet ,
      items: [
        {
          title: "Fees Management Dashboard",
          url: "#",
        },
        {
          title: "Send Reminder",
          url: "#",
        },
        {
          title: "Declined pyaments",
          url: "#",
        },
        {
          title: "Late fine",
          url: "#",
        },
        {
          title: "Concession",
          url: "#",
        },
        {
          title: "Add Fees Structure",
          url: "#",
        },
        {
          title: "Fees challan",
          url: "#",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export const sidebarData = data; 

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <div className="flex flex-col h-full p-4">
        <SearchWithMic />
        <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      </div>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
