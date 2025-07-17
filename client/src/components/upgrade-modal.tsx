import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, X, Zap, Star, Lock } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for learning the basics",
    features: [
      "Up to 3 bots",
      "Basic analytics",
      "Community support",
      "7-day activity history"
    ],
    limitations: [
      "Limited to simple bot types",
      "No advanced scheduling",
      "No custom integrations"
    ],
    buttonText: "Current Plan",
    popular: false,
    disabled: true
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Unlock the full potential of bot automation",
    features: [
      "Unlimited bots",
      "Advanced analytics & insights",
      "Priority support",
      "30-day activity history",
      "Custom bot types",
      "Advanced scheduling",
      "API integrations",
      "Real-time notifications",
      "Export analytics data"
    ],
    limitations: [],
    buttonText: "Upgrade to Pro",
    popular: true,
    disabled: false
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For teams and advanced automation",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced security",
      "Custom integrations",
      "Dedicated support",
      "Unlimited API calls",
      "Custom analytics",
      "White-label options"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    popular: false,
    disabled: false
  }
];

export default function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-sfs-brown border border-sfs-gold/20 text-sfs-gold">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-display text-2xl text-sfs-gold flex items-center">
              <Crown className="w-6 h-6 mr-3 text-sfs-gold" />
              Upgrade to Premium
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-sfs-gray hover:text-sfs-gold">
              <X className="w-5 h-5" />
            </Button>
          </div>
          {feature && (
            <p className="text-sfs-gray mt-2">
              Unlock <span className="text-sfs-gold font-semibold">{feature}</span> and more with a premium plan
            </p>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card-brown rounded-xl p-6 border transition-all duration-200 ${
                plan.popular 
                  ? "border-sfs-gold shadow-lg shadow-sfs-gold/20 animate-glow" 
                  : "border-sfs-gold/20 hover:border-sfs-gold/40"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-sfs-gold text-sfs-black px-4 py-1 font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-heading text-xl text-sfs-gold mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sfs-gray ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-sfs-gray-light">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-sfs-gray-light">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-sfs-gray mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-sfs-gray line-through">{limitation}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-semibold transition-all duration-200 ${
                  plan.disabled
                    ? "bg-sfs-gray/20 text-sfs-gray cursor-not-allowed"
                    : plan.popular
                    ? "bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright"
                    : "bg-sfs-brown-light text-sfs-gold hover:bg-sfs-gold hover:text-sfs-black border border-sfs-gold/50"
                }`}
                disabled={plan.disabled}
                onClick={() => {
                  if (!plan.disabled) {
                    // Handle upgrade logic here
                    console.log(`Upgrading to ${plan.name}`);
                  }
                }}
              >
                {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-sfs-gray">
            Need help choosing? {" "}
            <button className="text-sfs-gold hover:text-sfs-gold-bright underline">
              Contact our sales team
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}