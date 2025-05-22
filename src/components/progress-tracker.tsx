import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressTracker() {
  // Sample data for progress tracking
  const progressData = [
    {
      language: "Spanish",
      level: "Intermediate",
      progress: 65,
      streak: 12,
      minutes: 120,
      nextMilestone: "Advanced Conversation"
    }
  ];

  // Sample data for weekly activity
  const weeklyActivity = [
    { day: "Mon", minutes: 15 },
    { day: "Tue", minutes: 20 },
    { day: "Wed", minutes: 10 },
    { day: "Thu", minutes: 15 },
    { day: "Fri", minutes: 5 },
    { day: "Sat", minutes: 25 },
    { day: "Sun", minutes: 0 }
  ];

  // Calculate max minutes for scaling
  const maxMinutes = Math.max(...weeklyActivity.map(day => day.minutes));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Language Progress Card */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Language Progress</h3>
          
          {progressData.map((lang, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-bold">{lang.language}</h4>
                  <p className="text-sm text-gray-600">{lang.level}</p>
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  {lang.streak} Day Streak 🔥
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>{lang.progress}%</span>
                </div>
                <Progress value={lang.progress} className="h-2" />
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Total Practice Time: {lang.minutes} minutes</span>
                <span>Next: {lang.nextMilestone}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Weekly Activity Card */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
          
          <div className="flex items-end justify-between h-40 mb-2">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div 
                  className="w-full max-w-[30px] bg-black rounded-t-md" 
                  style={{ 
                    height: `${(day.minutes / maxMinutes) * 100}%`,
                    opacity: day.minutes === 0 ? 0.2 : 1
                  }}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm font-medium">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span>{day.day}</span>
                <span className="text-xs text-gray-600">{day.minutes}m</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-100 border-2 border-amber-500 rounded-lg">
            <p className="font-medium text-amber-800">
              Practice today to maintain your 12-day streak! 🔥
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 