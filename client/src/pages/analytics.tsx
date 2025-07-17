import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Zap, Activity } from "lucide-react";
import Sidebar from "@/components/sidebar";
import EnhancedAnalytics from "@/components/enhanced-analytics";

export default function Analytics() {
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gold-shine">Analytics Dashboard</h1>
                <p className="text-gold-shine">Advanced insights and performance tracking</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                <BarChart3 className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bubble-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gold-shine">Total Interactions</p>
                    <p className="text-2xl font-bold text-gold-shine">{stats?.totalInteractions || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gold-shine" />
                </div>
              </div>
              
              <div className="bubble-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gold-shine">Success Rate</p>
                    <p className="text-2xl font-bold text-gold-shine">{stats?.successRate || "0%"}</p>
                  </div>
                  <Zap className="h-8 w-8 text-gold-shine" />
                </div>
              </div>
              
              <div className="bubble-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gold-shine">Active Hours</p>
                    <p className="text-2xl font-bold text-gold-shine">{stats?.activeHours || "0h"}</p>
                  </div>
                  <Activity className="h-8 w-8 text-gold-shine" />
                </div>
              </div>
              
              <div className="bubble-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gold-shine">Cost Savings</p>
                    <p className="text-2xl font-bold text-gold-shine">{stats?.costSavings || "$0"}</p>
                  </div>
                  <Users className="h-8 w-8 text-gold-shine" />
                </div>
              </div>
            </div>

            {/* Enhanced Analytics Component */}
            <div className="space-y-6">
              <EnhancedAnalytics />
            </div>

            {/* Additional Analytics Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bubble-card p-6">
                <h3 className="text-xl font-semibold text-gold-shine mb-4">Performance Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Engagement Rate</span>
                    <span className="text-green-400 font-semibold">+15.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Follower Growth</span>
                    <span className="text-green-400 font-semibold">+8.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Content Reach</span>
                    <span className="text-green-400 font-semibold">+22.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Bot Efficiency</span>
                    <span className="text-green-400 font-semibold">+11.5%</span>
                  </div>
                </div>
              </div>

              <div className="bubble-card p-6">
                <h3 className="text-xl font-semibold text-gold-shine mb-4">Platform Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Twitter/X</span>
                    <span className="text-gold-shine font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Instagram</span>
                    <span className="text-gold-shine font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">LinkedIn</span>
                    <span className="text-gold-shine font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-shine">Others</span>
                    <span className="text-gold-shine font-semibold">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}