"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Globe, LogOut, Menu, Mic, Moon, Settings, Star, Sun, User } from "lucide-react"
import LanguageCard from "@/components/language-card"
import PracticeSession from "@/components/practice-session"
import ProgressTracker from "@/components/progress-tracker"
import MobileNavigation from "@/components/mobile-navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscription: string;
}

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user data")
        }
        
        const data = await response.json()
        setUserData(data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserData()
  }, [router])
  
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST"
      })
      
      if (response.ok) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    )
  }

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
            <div className="mr-2 font-medium">
              Welcome, {userData?.firstName || "User"}!
            </div>
            <Link href="/profile">
              <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Settings
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:block border-r-4 border-black bg-white/40 p-4">
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold p-3 bg-black text-white rounded-xl">
              Dashboard
            </Link>
            <Link href="/dashboard/progress" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
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
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black mb-4">YOUR DAILY SESSIONS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LanguageCard
                title="Sunrise Speak"
                description="Start your day with a 10-minute speaking practice"
                icon={<Sun className="h-6 w-6" />}
                color="bg-gradient-to-br from-amber-300 to-orange-500"
                progress={75}
              />
              <LanguageCard
                title="Sunset Speak"
                description="Wind down with an evening speaking session"
                icon={<Moon className="h-6 w-6" />}
                color="bg-gradient-to-br from-indigo-400 to-purple-600"
                progress={0}
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-black mb-4">PRACTICE NOW</h2>
            <Tabs defaultValue="speaking" className="w-full">
              <TabsList className="w-full bg-white/50 border-2 border-black rounded-xl p-1 mb-4">
                <TabsTrigger
                  value="speaking"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                >
                  Speaking
                </TabsTrigger>
                <TabsTrigger
                  value="listening"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                >
                  Listening
                </TabsTrigger>
                <TabsTrigger
                  value="vocabulary"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                >
                  Vocabulary
                </TabsTrigger>
              </TabsList>
              <TabsContent value="speaking">
                <PracticeSession type="speaking" />
              </TabsContent>
              <TabsContent value="listening">
                <PracticeSession type="listening" />
              </TabsContent>
              <TabsContent value="vocabulary">
                <PracticeSession type="vocabulary" />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black mb-4">YOUR PROGRESS</h2>
            <ProgressTracker />
          </div>
        </div>
      </div>
    </div>
  )
} 