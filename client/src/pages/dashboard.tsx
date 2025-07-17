import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/hero-section";
import PremiumTabs from "@/components/premium-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Crown } from "lucide-react";
import type { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="flex h-screen overflow-hidden bg-sfs-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Header */}
        <header className="bg-sfs-brown border-b border-sfs-gold/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-display text-2xl text-sfs-gold">Dashboard</h2>
                <p className="text-sfs-gray mt-1">Master social media automation with intelligent bots</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-sfs-gold border-sfs-gold/30">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-semibold transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                Create Bot
              </Button>
              <div className="relative">
                <Bell className="h-6 w-6 text-sfs-gold cursor-pointer hover:text-sfs-gold-bright transition-colors" />
                <Badge className="absolute -top-2 -right-2 bg-sfs-gold text-sfs-black text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center animate-pulse">
                  3
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Quick Stats Bar */}
          <div className="bg-sfs-surface-elevated border-b border-sfs-gold/10 p-6">
            <div className="max-w-6xl mx-auto">
              {statsLoading ? (
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-sfs-brown-card rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="glass-card-brown border-0">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sfs-gold">{stats?.totalInteractions || 0}</div>
                        <div className="text-sm text-sfs-gray">Total Interactions</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card-brown border-0">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sfs-gold">{stats?.successRate || "0%"}</div>
                        <div className="text-sm text-sfs-gray">Success Rate</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card-brown border-0">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sfs-gold">{stats?.activeHours || "0h"}</div>
                        <div className="text-sm text-sfs-gray">Active Hours</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card-brown border-0">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sfs-gold">{stats?.costSavings || "$0"}</div>
                        <div className="text-sm text-sfs-gray">Cost Savings</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Main Content with Premium Tabs */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              <PremiumTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
