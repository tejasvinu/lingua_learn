import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LanguageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
}

export default function LanguageCard({ title, description, icon, color, progress }: LanguageCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className={`${color} p-6 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-sm text-white/90 mb-4">{description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Today's Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/30" indicatorClassName="bg-white" />
            </div>
            
            <Button className="bg-white text-black hover:bg-white/90 font-bold rounded-lg">
              Start Session
            </Button>
          </div>
          <div className="p-3 bg-white/20 rounded-full">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
} 