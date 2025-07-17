import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, ArrowLeft, Settings, Zap, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/sidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateBot() {
  const [currentStep, setCurrentStep] = useState(1);
  const [botType, setBotType] = useState("");
  const [botName, setBotName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguring(true);
    // Simulate bot creation
    setTimeout(() => {
      setIsConfiguring(false);
      console.log("Creating bot:", { botType, botName, description, isActive });
    }, 2000);
  };

  const handleBotTypeSelect = (type: string) => {
    setBotType(type);
    setCurrentStep(2);
  };

  const botTypes = [
    {
      type: "content_creator",
      title: "Content Creator",
      description: "Automatically creates and posts content",
      icon: <Bot className="w-6 h-6" />,
      features: ["AI Content Generation", "Smart Scheduling", "Platform Optimization"]
    },
    {
      type: "engagement",
      title: "Engagement Bot",
      description: "Likes, comments, and shares content",
      icon: <Zap className="w-6 h-6" />,
      features: ["Smart Engagement", "Comment Analysis", "Interaction Tracking"]
    },
    {
      type: "follower",
      title: "Follower Bot",
      description: "Grows your following strategically",
      icon: <Users className="w-6 h-6" />,
      features: ["Target Audience", "Follow/Unfollow", "Growth Analytics"]
    },
    {
      type: "analytics",
      title: "Analytics Bot",
      description: "Tracks and analyzes performance",
      icon: <TrendingUp className="w-6 h-6" />,
      features: ["Performance Tracking", "Growth Insights", "ROI Analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm" className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black transition-all duration-200">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gold-shine">Create New Bot</h1>
                  <p className="text-gold-shine">Configure and deploy a new automation bot</p>
                </div>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                <Plus className="w-3 h-3 mr-1" />
                Step {currentStep} of 3
              </Badge>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bubble-card p-6">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          step <= currentStep 
                            ? 'bg-sfs-gold text-sfs-black' 
                            : 'bg-sfs-brown-card border border-sfs-gold/30 text-gold-shine'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {step}
                      </motion.div>
                      <span className={`ml-2 text-sm ${
                        step <= currentStep ? 'text-gold-shine' : 'text-gold-shine/50'
                      }`}>
                        {step === 1 ? 'Select Type' : step === 2 ? 'Configure' : 'Deploy'}
                      </span>
                      {step < 3 && (
                        <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                          step < currentStep ? 'bg-sfs-gold' : 'bg-sfs-gold/30'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bubble-card p-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gold-shine mb-2">Choose Your Bot Type</h3>
                    <p className="text-gold-shine">Select the type of automation bot you want to create</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {botTypes.map((bot, index) => (
                      <motion.div
                        key={bot.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`bubble-section p-6 cursor-pointer transition-all duration-300 border-2 ${
                          botType === bot.type 
                            ? 'border-sfs-gold shadow-lg shadow-sfs-gold/20' 
                            : 'border-transparent hover:border-sfs-gold/50'
                        }`}
                        onClick={() => handleBotTypeSelect(bot.type)}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-sfs-gold/20 rounded-lg text-gold-shine">
                            {bot.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gold-shine">{bot.title}</h4>
                            <p className="text-sm text-gold-shine/80">{bot.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {bot.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="flex items-center text-sm text-gold-shine/90"
                            >
                              <div className="w-2 h-2 bg-sfs-gold rounded-full mr-2" />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bubble-card p-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gold-shine mb-2">Configure Your Bot</h3>
                    <p className="text-gold-shine">Set up your {botTypes.find(b => b.type === botType)?.title} with custom settings</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label className="text-gold-shine">Bot Name</Label>
                          <Input
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                            placeholder="Enter bot name"
                            className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine transition-all duration-200 focus:border-sfs-gold focus:ring-2 focus:ring-sfs-gold/20"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-gold-shine">Description</Label>
                          <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what this bot will do"
                            className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine transition-all duration-200 focus:border-sfs-gold focus:ring-2 focus:ring-sfs-gold/20"
                            rows={4}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <Label className="text-gold-shine">Start Active</Label>
                          <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                          />
                        </div>
                        
                        <div className="bubble-section p-4">
                          <h4 className="font-semibold text-gold-shine mb-2">Bot Features</h4>
                          <ul className="space-y-2 text-sm text-gold-shine">
                            {botTypes.find(b => b.type === botType)?.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                • {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="flex items-center justify-between pt-6 border-t border-sfs-gold/20"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="border-sfs-gold/50 text-gold-shine hover:bg-sfs-gold hover:text-sfs-black transition-all duration-200"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      
                      <Button
                        type="submit"
                        disabled={!botName || isConfiguring}
                        className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright transition-all duration-200 min-w-[120px]"
                      >
                        {isConfiguring ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-sfs-black border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Settings className="w-4 h-4 mr-2" />
                            Create Bot
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}