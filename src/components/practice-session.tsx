import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, PlayCircle, Book } from "lucide-react";

interface PracticeSessionProps {
  type: "speaking" | "listening" | "vocabulary";
}

export default function PracticeSession({ type }: PracticeSessionProps) {
  const getContent = () => {
    switch (type) {
      case "speaking":
        return {
          title: "Speaking Practice",
          description: "Practice your pronunciation and conversation skills",
          icon: <Mic className="h-5 w-5" />,
          exercises: [
            "Introduce yourself in Spanish",
            "Order food at a restaurant",
            "Ask for directions to the museum",
            "Describe your daily routine"
          ]
        };
      case "listening":
        return {
          title: "Listening Practice",
          description: "Improve your comprehension with native speakers",
          icon: <PlayCircle className="h-5 w-5" />,
          exercises: [
            "Listen to a casual conversation",
            "Understand weather forecast",
            "Follow cooking instructions",
            "Comprehend travel announcements"
          ]
        };
      case "vocabulary":
        return {
          title: "Vocabulary Builder",
          description: "Expand your word knowledge with themed lessons",
          icon: <Book className="h-5 w-5" />,
          exercises: [
            "Food and dining vocabulary",
            "Travel essentials words",
            "Business meeting terminology",
            "Everyday expressions"
          ]
        };
    }
  };

  const content = getContent();

  return (
    <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-black rounded-lg text-white">
            {content?.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg">{content?.title}</h3>
            <p className="text-sm text-gray-600">{content?.description}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {content?.exercises.map((exercise, index) => (
            <div 
              key={index} 
              className="p-3 border-2 border-black rounded-lg flex justify-between items-center bg-white hover:bg-gray-50 cursor-pointer"
            >
              <span className="font-medium">{exercise}</span>
              <Button size="sm" className="bg-black text-white hover:bg-black/80">
                Start
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full bg-black text-white hover:bg-black/80 font-bold">
          See All {content?.title} Exercises
        </Button>
      </CardContent>
    </Card>
  );
} 