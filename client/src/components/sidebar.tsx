import { Link, useLocation } from "wouter";
import { Bot as BotIcon, Home, Plus, BarChart3, Newspaper, Settings, User, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/create", icon: Plus, label: "Create Bot" },
  { href: "/bots", icon: BotIcon, label: "My Bots" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/feed", icon: Newspaper, label: "Social Feed" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-sfs-brown border-r border-sfs-gold/20 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sfs-gold/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sfs-gold rounded-xl flex items-center justify-center animate-glow">
            <BotIcon className="text-sfs-black text-xl" />
          </div>
          <div className="flex-1">
            <h1 className="text-display text-lg text-sfs-gold">Smart Flow Systems</h1>
            <p className="text-xs text-sfs-gray">Premium Bot Platform</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-sfs-gold text-sfs-black shadow-lg" 
                  : "text-sfs-gold hover:bg-sfs-brown-light hover:text-sfs-gold-bright"
              }`}>
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sfs-gold/20">
        <div className="flex items-center space-x-3 hover:bg-sfs-brown-light rounded-xl p-2 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-sfs-gold rounded-full flex items-center justify-center">
            <User className="text-sfs-black text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sfs-gold">Learning User</p>
            <p className="text-xs text-sfs-gray">Premium Member</p>
          </div>
          <ChevronRight className="text-xs text-sfs-gray hover:text-sfs-gold transition-colors" />
        </div>
      </div>
    </div>
  );
}
