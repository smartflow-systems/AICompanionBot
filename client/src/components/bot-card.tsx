import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Bot } from "@shared/schema";
import type { BotStats } from "@/lib/types";
import { Bot as BotIcon, Zap, Users, TrendingUp, Settings, Play, Pause, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BotCardProps {
  bot: Bot;
}

export default function BotCard({ bot }: BotCardProps) {
  const queryClient = useQueryClient();
  const stats = bot.stats as BotStats;

  const toggleBotMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/bots/${bot.id}`, {
        isActive: !bot.isActive
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const handleToggle = () => {
    toggleBotMutation.mutate();
  };

  const getBotIcon = () => {
    switch (bot.type) {
      case "content_creator": return <BotIcon className="w-5 h-5" />;
      case "engagement": return <Zap className="w-5 h-5" />;
      case "follower": return <Users className="w-5 h-5" />;
      case "analytics": return <BarChart3 className="w-5 h-5" />;
      default: return <BotIcon className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 40px rgba(255, 215, 0, 0.2)"
      }}
      className="bubble-card p-6 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sfs-gold/5 to-sfs-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className={`p-2 rounded-lg transition-all duration-300 ${
                bot.isActive 
                  ? 'bg-sfs-gold text-sfs-black' 
                  : 'bg-sfs-brown-card border border-sfs-gold/30 text-gold-shine'
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {getBotIcon()}
            </motion.div>
            <div>
              <h4 className="text-heading font-semibold text-gold-shine">{bot.name}</h4>
              <p className="text-sm text-gold-shine/70 capitalize">{bot.type.replace("_", " ")}</p>
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={bot.isActive ? 'active' : 'paused'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                  bot.isActive 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                {bot.isActive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span>{bot.isActive ? 'Active' : 'Paused'}</span>
              </Badge>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.p
          className="text-sm text-gold-shine mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {bot.description}
        </motion.p>
        
        <motion.div
          className="grid grid-cols-2 gap-4 text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {bot.type === "content_creator" && (
            <>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.postsCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.postsCount || 0}
                </motion.div>
                <div className="text-xs text-gold-shine/70">Posts</div>
              </motion.div>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.engagementRate}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.engagementRate || 0}%
                </motion.div>
                <div className="text-xs text-gold-shine/70">Engagement</div>
              </motion.div>
            </>
          )}
          
          {bot.type === "engagement" && (
            <>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.likesCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.likesCount || 0}
                </motion.div>
                <div className="text-xs text-gold-shine/70">Likes</div>
              </motion.div>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.commentsCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.commentsCount || 0}
                </motion.div>
                <div className="text-xs text-gold-shine/70">Comments</div>
              </motion.div>
            </>
          )}
          
          {bot.type === "follower" && (
            <>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.followsCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.followsCount || 0}
                </motion.div>
                <div className="text-xs text-gold-shine/70">Follows</div>
              </motion.div>
              <motion.div
                className="text-center p-3 bg-sfs-brown/30 rounded-lg border border-sfs-gold/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-xl font-bold text-gold-shine"
                  key={stats.successRate}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stats.successRate || 0}%
                </motion.div>
                <div className="text-xs text-gold-shine/70">Success Rate</div>
              </motion.div>
            </>
          )}
        </motion.div>
        
        <motion.div
          className="flex space-x-3 pt-4 border-t border-sfs-gold/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-medium transition-all duration-200"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </motion.div>
          
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-sfs-gold/50 text-gold-shine hover:bg-sfs-gold hover:text-sfs-black transition-all duration-200"
              onClick={handleToggle}
              disabled={toggleBotMutation.isPending}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={toggleBotMutation.isPending ? 'loading' : bot.isActive ? 'pause' : 'start'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {toggleBotMutation.isPending ? (
                    <motion.div
                      className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : bot.isActive ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}