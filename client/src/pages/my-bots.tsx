import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Settings, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/sidebar";
import BotCard from "@/components/bot-card";
import type { Bot as BotType } from "@shared/schema";

export default function MyBots() {
  const { data: bots = [], isLoading } = useQuery<BotType[]>({
    queryKey: ["/api/bots"],
  });

  const activeBots = bots.filter(bot => bot.isActive);
  const inactiveBots = bots.filter(bot => !bot.isActive);

  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gold-shine">My Bots</h1>
                <p className="text-gold-shine">Manage and monitor your automation bots</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {activeBots.length} Active
                </Badge>
                <Link href="/create-bot">
                  <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Bot
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bubble-card p-6 text-center">
                <Bot className="w-8 h-8 text-gold-shine mx-auto mb-2" />
                <div className="text-2xl font-bold text-gold-shine">{bots.length}</div>
                <div className="text-sm text-gold-shine">Total Bots</div>
              </div>
              <div className="bubble-card p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gold-shine">{activeBots.length}</div>
                <div className="text-sm text-gold-shine">Active Bots</div>
              </div>
              <div className="bubble-card p-6 text-center">
                <Settings className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gold-shine">{inactiveBots.length}</div>
                <div className="text-sm text-gold-shine">Inactive Bots</div>
              </div>
              <div className="bubble-card p-6 text-center">
                <div className="w-8 h-8 bg-sfs-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sfs-black font-bold">%</span>
                </div>
                <div className="text-2xl font-bold text-gold-shine">
                  {bots.length > 0 ? Math.round((activeBots.length / bots.length) * 100) : 0}%
                </div>
                <div className="text-sm text-gold-shine">Success Rate</div>
              </div>
            </div>

            {/* Active Bots Section */}
            {activeBots.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gold-shine mb-4">Active Bots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeBots.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              </div>
            )}

            {/* Inactive Bots Section */}
            {inactiveBots.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gold-shine mb-4">Inactive Bots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inactiveBots.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              </div>
            )}

            {/* All Bots Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gold-shine mb-4">All Bots</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="h-48 bg-sfs-brown-card rounded-xl animate-pulse border border-sfs-gold/20" />
                  ))}
                </div>
              ) : bots.length === 0 ? (
                <div className="text-center py-12 bubble-card">
                  <Bot className="w-16 h-16 text-gold-shine mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gold-shine mb-2">No Bots Created Yet</h3>
                  <p className="text-gold-shine mb-6">Get started by creating your first automation bot</p>
                  <Link href="/create-bot">
                    <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Bot
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bots.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}