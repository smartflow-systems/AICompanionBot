import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database } from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="min-h-screen bg-sfs-brown">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gold-shine">Settings</h1>
                <p className="text-gold-shine">Configure your account and application preferences</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                <SettingsIcon className="w-3 h-3 mr-1" />
                Configuration
              </Badge>
            </div>

            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bubble-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-gold-shine" />
                  <h2 className="text-xl font-semibold text-gold-shine">Profile Settings</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gold-shine">Display Name</Label>
                    <Input
                      defaultValue="Learning User"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                  <div>
                    <Label className="text-gold-shine">Email Address</Label>
                    <Input
                      defaultValue="user@smartflowsystems.com"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                  <div>
                    <Label className="text-gold-shine">Company</Label>
                    <Input
                      defaultValue="Smart Flow Systems"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                  <div>
                    <Label className="text-gold-shine">Role</Label>
                    <Input
                      defaultValue="Premium Member"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bubble-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-gold-shine" />
                  <h2 className="text-xl font-semibold text-gold-shine">Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gold-shine">Email Notifications</Label>
                      <p className="text-sm text-gold-shine">Receive updates about bot activity via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gold-shine">Push Notifications</Label>
                      <p className="text-sm text-gold-shine">Get real-time alerts in your browser</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bubble-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-6 h-6 text-gold-shine" />
                  <h2 className="text-xl font-semibold text-gold-shine">Appearance</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gold-shine">Dark Mode</Label>
                      <p className="text-sm text-gold-shine">Use dark theme for the application</p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gold-shine">Auto-save Changes</Label>
                      <p className="text-sm text-gold-shine">Automatically save configuration changes</p>
                    </div>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bubble-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-gold-shine" />
                  <h2 className="text-xl font-semibold text-gold-shine">Security</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-gold-shine">Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                  <div>
                    <Label className="text-gold-shine">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                  <div>
                    <Label className="text-gold-shine">Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                    />
                  </div>
                </div>
              </div>

              {/* Data & Privacy */}
              <div className="bubble-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="w-6 h-6 text-gold-shine" />
                  <h2 className="text-xl font-semibold text-gold-shine">Data & Privacy</h2>
                </div>
                
                <div className="space-y-4">
                  <Button variant="outline" className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black">
                    Export My Data
                  </Button>
                  <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
                    Delete Account
                  </Button>
                </div>
              </div>

              {/* Save Changes */}
              <div className="flex space-x-4">
                <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright">
                  Save Changes
                </Button>
                <Button variant="outline" className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black">
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}