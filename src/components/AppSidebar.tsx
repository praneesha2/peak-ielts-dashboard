import { Home, Mic, BarChart3, Award, Settings, Download } from "lucide-react";
import { NavLink } from "./NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Practice", url: "/practice", icon: Mic },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Achievements", url: "/achievements", icon: Award },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          {open && <h1 className="text-xl font-bold">PeakIELTS</h1>}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild className="h-12 rounded-2xl">
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-4 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all haptic-btn"
                      activeClassName="bg-primary/10 text-primary font-semibold"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Mobile App Promo */}
        {open && (
          <div className="mt-auto p-5 rounded-3xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 backdrop-blur-xl border border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center mb-3">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Get Mobile App</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Practice anywhere, anytime.
            </p>
            <button className="w-full py-2 px-4 bg-primary hover:bg-primary/90 rounded-xl text-sm font-semibold transition-colors haptic-btn">
              <Download className="w-4 h-4 inline mr-2" />
              Download
            </button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
