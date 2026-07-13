import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSubscribe = (tierName) => {
    if (tierName === "Free") {
      navigate("/lobby");
    } else {
      toast.success(`🎉 Simulated checkout opened for ${tierName} (${isAnnual ? "Annual" : "Monthly"})!`);
    }
  };

  const plans = [
    {
      name: "Free",
      priceMonthly: 0,
      priceAnnual: 0,
      desc: "For small casual groups to watch and chat together.",
      features: [
        "Up to 5 participants per room",
        "YouTube video sources only",
        "Real-time synchronized playback",
        "Instant text chat & emojis",
        "Ad-supported interface"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Premium",
      priceMonthly: 4.99,
      priceAnnual: 3.99,
      desc: "Perfect for friend groups and streaming enthusiasts.",
      features: [
        "Up to 25 participants per room",
        "YouTube & custom video file links",
        "HD/4K optimized sync pipeline",
        "Ad-free user interface",
        "In-room Voice Chat functionality",
        "Custom room background skins"
      ],
      cta: "Upgrade to Premium",
      popular: true
    },
    {
      name: "Pro/Creator",
      priceMonthly: 14.99,
      priceAnnual: 11.99,
      desc: "For digital creators, streaming communities, and events.",
      features: [
        "Unlimited participants per room",
        "Support for custom RTMP streams",
        "Permanent customizable room URLs",
        "Password-protected rooms",
        "Voice + Video stream broadcasts",
        "Moderator activity logs & reports"
      ],
      cta: "Go Pro",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-bg relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none rounded-full bg-accent blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-accent text-sm font-semibold tracking-wider uppercase">Pricing Plans</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Flexible Plans Tailored to Your Watch Party Sizes
          </h3>
          <p className="text-muted text-base sm:text-lg">
            Free forever for casual watching. Unlock unlimited room capacity, video quality, and voice chat.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className={`text-sm font-medium transition-colors duration-200 ${!isAnnual ? "text-primary" : "text-muted"}`}>
              Billed Monthly
            </span>
            
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6.5 bg-line border border-line rounded-full cursor-pointer flex items-center p-0.5 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle billing frequency"
            >
              <div 
                className={`w-5.5 h-5.5 rounded-full bg-accent transition-transform duration-300 ${isAnnual ? "translate-x-5 bg-[#3b82f6]" : "translate-x-0"}`} 
              />
            </button>

            <span className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${isAnnual ? "text-primary" : "text-muted"}`}>
              Billed Annually
              <span className="text-[10px] bg-accent/20 text-[#a78bfa] font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const priceVal = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={idx}
                className={`card flex flex-col p-8 rounded-2xl relative transition-all duration-300 hover:scale-[1.01] ${
                  plan.popular 
                    ? "bg-surface border-2 border-accent shadow-xl shadow-accent/5" 
                    : "bg-surface/50 border border-line"
                }`}
              >
                {/* Popular Ribbon Tag */}
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white font-extrabold text-[10px] tracking-widest uppercase py-1 px-4 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                {/* Plan Info */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-primary">{plan.name}</h4>
                  <p className="text-muted text-xs mt-2 leading-relaxed h-10">{plan.desc}</p>
                </div>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-1 text-primary">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    ${priceVal}
                  </span>
                  <span className="text-muted text-sm font-medium">
                    {plan.priceMonthly === 0 ? "" : isAnnual ? "/mo, billed annually" : "/mo"}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-[#c7c7e2]">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-2.5 font-bold text-sm tracking-wide rounded-lg cursor-pointer transition-all duration-200 ${
                    plan.popular
                      ? "btn hover:scale-[1.02] shadow-md shadow-accent/20"
                      : "btn btn-ghost hover:scale-[1.02]"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
