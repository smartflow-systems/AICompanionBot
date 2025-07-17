import { Badge } from "@/components/ui/badge";
import { Activity, MessageCircle, Heart, Share } from "lucide-react";
import Sidebar from "@/components/sidebar";
import SocialFeed from "@/components/social-feed";
import ActivityFeed from "@/components/activity-feed";

export default function SocialFeedPage() {
  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gold-shine">Social Feed</h1>
                <p className="text-gold-shine">Live social media activity and bot interactions</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30 animate-pulse">
                <Activity className="w-3 h-3 mr-1" />
                Live Updates
              </Badge>
            </div>

            {/* Feed Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Social Feed */}
              <div className="lg:col-span-2">
                <SocialFeed />
              </div>

              {/* Activity Sidebar */}
              <div className="space-y-6">
                <ActivityFeed />
                
                {/* Quick Stats */}
                <div className="bubble-card p-6">
                  <h3 className="text-lg font-semibold text-gold-shine mb-4">Live Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-gold-shine text-sm">Likes</span>
                      </div>
                      <span className="text-gold-shine font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-gold-shine text-sm">Comments</span>
                      </div>
                      <span className="text-gold-shine font-semibold">358</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Share className="w-4 h-4 text-green-400" />
                        <span className="text-gold-shine text-sm">Shares</span>
                      </div>
                      <span className="text-gold-shine font-semibold">89</span>
                    </div>
                  </div>
                </div>

                {/* Bot Activity Summary */}
                <div className="bubble-card p-6">
                  <h3 className="text-lg font-semibold text-gold-shine mb-4">Bot Activity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gold-shine text-sm">Content Creator Bot</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-shine text-sm">Engagement Bot</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-shine text-sm">Follower Bot</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Paused</Badge>
                    </div>
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