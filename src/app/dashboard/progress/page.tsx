import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Globe, Calendar, BarChart, Award, TrendingUp, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MobileNavigation from "@/components/mobile-navigation"

export default function ProgressPage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">LINGUA-LEARN</h1>

          {/* Mobile menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-2 border-black">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="border-r-4 border-black p-0">
                <MobileNavigation />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Profile
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:block border-r-4 border-black bg-white/40 p-4">
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Dashboard
            </Link>
            <Link href="/dashboard/progress" className="flex items-center gap-2 text-lg font-bold p-3 bg-black text-white rounded-xl">
              Progress
            </Link>
            <Link href="/dashboard/schedule" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Schedule
            </Link>
            <Link href="/dashboard/community" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Community
            </Link>
          </nav>

          <div className="mt-8">
            <h2 className="text-xl font-black mb-4">MY LANGUAGES</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold"
              >
                <Globe className="h-5 w-5" /> Spanish
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold"
              >
                <Globe className="h-5 w-5" /> French
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold"
              >
                <Globe className="h-5 w-5" /> Japanese
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold"
              >
                <Globe className="h-5 w-5" /> German
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="overflow-auto p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Your Progress</h2>
            <p className="text-gray-600">Track your language learning journey and achievements</p>
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-black text-white hover:bg-black/80 rounded-lg px-4">
                  Spanish
                </Button>
                <Button variant="outline" className="rounded-lg px-4">
                  French
                </Button>
                <Button variant="outline" className="rounded-lg px-4">
                  Japanese
                </Button>
                <Button variant="outline" className="rounded-lg px-4">
                  German
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Current Streak</h3>
              </div>
              <div className="text-3xl font-black">12 days</div>
              <p className="text-sm text-gray-500">Best: 15 days</p>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Total Practice Time</h3>
              </div>
              <div className="text-3xl font-black">320 min</div>
              <p className="text-sm text-gray-500">This month: 120 min</p>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Level</h3>
              </div>
              <div className="text-3xl font-black">Intermediate</div>
              <p className="text-sm text-gray-500">65% to Advanced</p>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="flex items-center mb-2">
                <BarChart className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Completed Exercises</h3>
              </div>
              <div className="text-3xl font-black">48</div>
              <p className="text-sm text-gray-500">This week: 14</p>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Monthly Progress</h3>
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Speaking</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold mr-2">78%</div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={78} className="h-2 mt-1" />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Listening</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold mr-2">65%</div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={65} className="h-2 mt-1" />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Vocabulary</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold mr-2">82%</div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={82} className="h-2 mt-1" />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Grammar</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold mr-2">54%</div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={54} className="h-2 mt-1" />
                </div>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Monthly progress chart visualization</p>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
            <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border-2 border-black rounded-lg p-4 bg-amber-50">
                  <Award className="h-8 w-8 text-amber-500 mb-2" />
                  <h4 className="font-bold">10-Day Streak</h4>
                  <p className="text-sm text-gray-600">Completed 10 consecutive days of practice</p>
                  <div className="text-xs text-gray-500 mt-2">Earned 3 days ago</div>
                </div>
                
                <div className="border-2 border-black rounded-lg p-4 bg-blue-50">
                  <Award className="h-8 w-8 text-blue-500 mb-2" />
                  <h4 className="font-bold">Conversation Master</h4>
                  <p className="text-sm text-gray-600">Completed 25 speaking exercises</p>
                  <div className="text-xs text-gray-500 mt-2">Earned 1 week ago</div>
                </div>
                
                <div className="border-2 border-black rounded-lg p-4 bg-purple-50">
                  <Award className="h-8 w-8 text-purple-500 mb-2" />
                  <h4 className="font-bold">Vocabulary Builder</h4>
                  <p className="text-sm text-gray-600">Learned 100 new words</p>
                  <div className="text-xs text-gray-500 mt-2">Earned 2 weeks ago</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="rounded-xl border-2 border-black font-bold">
                  View All Achievements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 