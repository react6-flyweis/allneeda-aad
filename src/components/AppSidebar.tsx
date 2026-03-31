import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  ActivityIcon,
  CalendarIcon,
  ChartColumnIcon,
  CuboidIcon,
  ZapIcon,
} from "lucide-react";

import allneedaLogo from "@/assets/Logo.svg";
import LogoutDialog from "./LogoutDialog";

export default function AppSidebar() {
  const location = useLocation();
  const activeItemRef = useRef<HTMLLIElement>(null);
  const activeMenu =
    location.pathname === "/app-manage"
      ? (new URLSearchParams(location.search).get("view") ?? "overview")
      : "";

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.pathname]);

  const menuItems = [
    {
      icon: ActivityIcon,
      label: "Overview",
      key: "overview",
      path: "/dashboard",
    },
    {
      icon: ZapIcon,
      label: "Workflows",
      key: "workflows",
      path: "/workflows",
    },
    {
      icon: ChartColumnIcon,
      label: "Monitoring",
      key: "monitoring",
      path: "/monitoring",
    },
    {
      icon: CalendarIcon,
      label: "Events",
      key: "events",
      path: "/events",
    },
    {
      icon: CuboidIcon,
      label: "Actions",
      key: "actions",
      path: "/actions",
    },
  ];

  return (
    <Sidebar className="border-0 shadow-none rounded-r-4xl overflow-hidden">
      <SidebarHeader className="px-3 py-4 font-poppins">
        <div className="flex flex-col items-center">
          <img
            src={allneedaLogo}
            alt="Allneeda Logo"
            className="size-20 w-auto mb-2"
          />
          <div className="text-sidebar-foreground truncate font-poppins">
            Allneeda Automation
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pl-4 pt-4 border-0 shadow-none">
        <SidebarMenu className="space-y-1">
          {menuItems.map((m) => {
            const isActive = activeMenu === m.key;
            return (
              <SidebarMenuItem
                key={m.label}
                ref={isActive ? activeItemRef : null}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="relative overflow-visible h-10 pl-4 rounded-l-full data-[active=true]:font-semibold data-[active=true]:before:absolute data-[active=true]:before:right-0 data-[active=true]:before:-top-[20px] data-[active=true]:before:h-[20px] data-[active=true]:before:w-[20px] data-[active=true]:before:bg-[radial-gradient(circle_at_0_0,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:before:content-[''] data-[active=true]:after:absolute data-[active=true]:after:right-0 data-[active=true]:after:-bottom-[20px] data-[active=true]:after:h-[20px] data-[active=true]:after:w-[20px] data-[active=true]:after:bg-[radial-gradient(circle_at_0_20px,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:after:content-['']"
                >
                  <NavLink
                    to={m.path}
                    className="flex items-center gap-2 w-full font-poppins"
                  >
                    <m.icon />
                    <span className="truncate">{m.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {/* Logout button */}
        <LogoutDialog />
      </SidebarFooter>

      {/* 
      <SidebarRail /> */}
    </Sidebar>
  );
}
