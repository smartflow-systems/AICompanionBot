import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, ArrowLeft, Settings, Zap } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/sidebar";

export default function CreateBot() {
  const [botType, setBotType] = useState("");
  const [botName, setBotName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle bot creation
    console.log("Creating bot:", { botType, botName, description, isActive });
  };

  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm" className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black">
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
                New Bot
              </Badge>
            </div>

            {/* Bot Creation Form */}
            <div className="bubble-card p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bot Type Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gold-shine">Bot Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        type: "content_creator",
                        title: "Content Creator",
                        description: "Automatically creates and posts content",
                        icon: <Bot className="w-6 h-6" />
                      },
                      {
                        type: "engagement",
                        title: "Engagement Bot",
                        description: "Likes, comments, and shares content",
                        icon: <Zap className="w-6 h-6" />
                      },
                      {
                        type: "follower",
                        title: "Follower Bot",
                        description: "Follows relevant accounts and users",
                        icon: <Settings className="w-6 h-6" />
                      }
                    ].map((option) => (
                      <div
                        key={option.type}
                        className={`bubble-section p-4 cursor-pointer transition-all duration-200 ${
                          botType === option.type 
                            ? 'border-sfs-gold shadow-lg shadow-sfs-gold/20' 
                            : 'hover:border-sfs-gold/50'
                        }`}
                        onClick={() => setBotType(option.type)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 rounded-lg bg-sfs-gold text-sfs-black">
                            {option.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gold-shine">{option.title}</h4>
                            <p className="text-xs text-gold-shine">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bot Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gold-shine">Bot Name</Label>
                      <Input
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="Enter bot name"
                        className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-gold-shine">Description</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this bot will do"
                        className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
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
                        <li>• AI-powered content generation</li>
                        <li>• Smart engagement optimization</li>
                        <li>• Real-time performance tracking</li>
                        <li>• Cross-platform deployment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6 border-t border-sfs-gold/30">
                  <Button
                    type="submit"
                    disabled={!botType || !botName}
                    className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Bot
                  </Button>
                  <Link href="/">
                    <Button variant="outline" size="lg" className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}