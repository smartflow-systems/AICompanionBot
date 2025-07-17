import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, HelpCircle, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface BotConfigurationProps {
  onUpgradeNeeded?: () => void;
  canCreateBot?: boolean;
}

export default function BotConfiguration({ onUpgradeNeeded, canCreateBot = true }: BotConfigurationProps) {
  const [botType, setBotType] = useState("content_creator");
  const [activityLevel, setActivityLevel] = useState([5]);
  const [keywords, setKeywords] = useState("automation, productivity, AI");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [respectLimits, setRespectLimits] = useState(true);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBotMutation = useMutation({
    mutationFn: async () => {
      const config = {
        activityLevel: activityLevel[0],
        keywords: keywords.split(",").map(k => k.trim()),
        schedule: { start: startTime, end: endTime },
        respectLimits
      };

      return apiRequest("POST", "/api/bots", {
        name: `${botType.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())} Bot`,
        type: botType,
        description: getDescriptionForType(botType),
        config,
        isActive: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Bot Created",
        description: "Your new bot has been successfully deployed!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create bot. Please try again.",
        variant: "destructive",
      });
    }
  });

  const getDescriptionForType = (type: string) => {
    switch (type) {
      case "content_creator":
        return "Automatically creates and posts engaging content";
      case "engagement":
        return "Likes and comments on relevant posts";
      case "follower":
        return "Follows accounts based on targeting criteria";
      case "analytics":
        return "Monitors and analyzes social media metrics";
      default:
        return "Custom bot configuration";
    }
  };

  const getActivityLevelLabel = (level: number) => {
    if (level <= 3) return "Low";
    if (level <= 7) return "Medium";
    return "High";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBotMutation.mutate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-sfs-brown-card border-sfs-gold/30 overflow-hidden">
        <CardHeader className="border-b border-sfs-gold/20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <CardTitle className="text-lg font-semibold text-gold-shine flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Settings className="mr-2 h-5 w-5" />
              </motion.div>
              Bot Configuration
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HelpCircle className="ml-2 h-4 w-4 text-gold-shine/70 cursor-help hover:text-gold-shine transition-colors duration-200" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-48 text-xs">
                    Configure how your bots behave, including posting frequency, engagement rules, and targeting parameters.
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </motion.div>
        </CardHeader>
      
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gold-shine mb-2 block">Bot Type</Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
              >
                <Select value={botType} onValueChange={setBotType}>
                  <SelectTrigger className="w-full bg-sfs-brown border-sfs-gold/30 text-gold-shine hover:border-sfs-gold transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sfs-brown-card border-sfs-gold/30">
                    <SelectItem value="content_creator">Content Creator Bot</SelectItem>
                    <SelectItem value="engagement">Engagement Bot</SelectItem>
                    <SelectItem value="follower">Follower Bot</SelectItem>
                    <SelectItem value="analytics">Analytics Bot</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gold-shine mb-2 block">Activity Level</Label>
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.01 }}
                >
                  <Slider
                    value={activityLevel}
                    onValueChange={setActivityLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                </motion.div>
                <motion.span
                  className="text-sm text-gold-shine min-w-[4rem] font-medium"
                  key={activityLevel[0]}
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {getActivityLevelLabel(activityLevel[0])}
                </motion.span>
              </div>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gold-shine mb-2 block">Target Keywords</Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
              >
                <Input 
                  type="text" 
                  placeholder="automation, productivity, AI" 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full bg-sfs-brown border-sfs-gold/30 text-gold-shine placeholder:text-gold-shine/50 hover:border-sfs-gold focus:border-sfs-gold focus:ring-2 focus:ring-sfs-gold/20 transition-all duration-200"
                />
              </motion.div>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gold-shine mb-2 block">Posting Schedule</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <Input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="bg-sfs-brown border-sfs-gold/30 text-gold-shine hover:border-sfs-gold focus:border-sfs-gold focus:ring-2 focus:ring-sfs-gold/20 transition-all duration-200"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <Input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="bg-sfs-brown border-sfs-gold/30 text-gold-shine hover:border-sfs-gold focus:border-sfs-gold focus:ring-2 focus:ring-sfs-gold/20 transition-all duration-200"
                  />
                </motion.div>
              </div>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center space-x-3 p-3 rounded-lg bg-sfs-brown/50 border border-sfs-gold/20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Checkbox 
                  id="respectLimits"
                  checked={respectLimits}
                  onCheckedChange={(checked) => setRespectLimits(!!checked)}
                  className="border-sfs-gold/50 data-[state=checked]:bg-sfs-gold data-[state=checked]:border-sfs-gold"
                />
              </motion.div>
              <Label htmlFor="respectLimits" className="text-sm text-gold-shine cursor-pointer">
                Respect platform rate limits
              </Label>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-4 border-t border-sfs-gold/20"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-medium transition-all duration-200 relative overflow-hidden"
                  disabled={createBotMutation.isPending || !canCreateBot}
                >
                  {createBotMutation.isPending ? (
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-sfs-black border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Deploying Bot...
                    </motion.div>
                  ) : !canCreateBot ? (
                    <motion.div
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={onUpgradeNeeded}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Upgrade to Deploy
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Deploy Bot
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
