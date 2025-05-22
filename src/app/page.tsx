"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Globe, LogOut, Mic, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscription: string;
}

export default function LandingPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        
        if (response.ok) {
          const data = await response.json()
          setUserData(data.user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserData()
  }, [])
  
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST"
      })
      
      if (response.ok) {
        setUserData(null)
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
        <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">LINGUA-LEARN</h1>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="font-bold hover:underline">Features</Link>
            <Link href="/pricing" className="font-bold hover:underline">Pricing</Link>
            <Link href="/about" className="font-bold hover:underline">About</Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="text-sm">Loading...</div>
            ) : userData ? (
              <>
                <div className="hidden sm:block mr-2 font-medium">
                  Welcome, {userData.firstName}!
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
                Learn Languages <span className="text-purple-600">Naturally</span> with 10-Minute Sessions
              </h1>
              <p className="text-lg mb-8">
                Lingua-Learn helps you become fluent through focused daily practice sessions designed to fit your schedule.
              </p>
              <div className="flex flex-wrap gap-4">
                {userData ? (
                  <Link href="/dashboard">
                    <Button className="bg-black hover:bg-black/80 text-white text-lg rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-6">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button className="bg-black hover:bg-black/80 text-white text-lg rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-6">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" className="text-lg rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-6">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-amber-300 to-orange-500 rounded-xl p-4 text-white">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="font-bold">Sunrise Speak</h3>
                        <p className="text-sm">Morning session</p>
                      </div>
                      <Sun className="h-6 w-6" />
                    </div>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 font-bold w-full">
                      Start
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl p-4 text-white">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="font-bold">Sunset Speak</h3>
                        <p className="text-sm">Evening session</p>
                      </div>
                      <Moon className="h-6 w-6" />
                    </div>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 font-bold w-full">
                      Start
                    </Button>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 right-8 w-full h-full border-4 border-black rounded-3xl bg-purple-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/30 border-y-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Why Choose Lingua-Learn?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-3 bg-amber-100 rounded-full w-fit mb-4">
                <Sun className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sunrise & Sunset Sessions</h3>
              <p>Optimize your learning with scientifically designed morning and evening 10-minute practice sessions.</p>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                <Mic className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Feedback</h3>
              <p>Get instant pronunciation feedback and personalized suggestions from our advanced AI speech coach.</p>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-3 bg-green-100 rounded-full w-fit mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Languages</h3>
              <p>Choose from dozens of languages with tailored learning paths for each one based on your proficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">How Lingua-Learn Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-bold mb-2">Choose Your Language</h3>
              <p className="text-sm">Select from over 25 languages to start your learning journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-bold mb-2">Complete Assessment</h3>
              <p className="text-sm">Take a quick test to determine your current proficiency level</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-bold mb-2">Daily Practice</h3>
              <p className="text-sm">Commit to your morning and evening 10-minute speaking sessions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-bold mb-2">Track Progress</h3>
              <p className="text-sm">Watch your fluency improve through detailed progress metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white/30 border-y-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-4 italic">"I've tried many language apps, but Lingua-Learn's focus on speaking practice has improved my confidence tremendously. The 10-minute sessions fit perfectly into my busy schedule."</p>
              <div className="font-bold">Sarah T.</div>
              <div className="text-sm">Learning Spanish - 3 months</div>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-4 italic">"The AI feedback on my pronunciation has been a game-changer. I can actually hear and correct my mistakes in real-time, which wasn't possible with other apps."</p>
              <div className="font-bold">Michael K.</div>
              <div className="text-sm">Learning Japanese - 6 months</div>
            </div>
            
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-4 italic">"The morning and evening sessions really work! I retain vocabulary better and my speaking flows more naturally. My French teacher noticed the improvement after just a few weeks."</p>
              <div className="font-bold">Alex W.</div>
              <div className="text-sm">Learning French - 2 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Start Your Language Journey?</h2>
          <p className="text-lg mb-8">Join thousands of learners who are achieving fluency with just 20 minutes of practice per day.</p>
          {userData ? (
            <Link href="/dashboard">
              <Button className="bg-black hover:bg-black/80 text-white text-lg rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-6">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button className="bg-black hover:bg-black/80 text-white text-lg rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-6">
                Get Started For Free
              </Button>
            </Link>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white/40 backdrop-blur-md py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-black mb-4">LINGUA-LEARN</h3>
              <p className="text-sm">Revolutionizing language learning with focused 10-minute daily speaking practice.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm hover:underline">Features</Link></li>
                <li><Link href="/pricing" className="text-sm hover:underline">Pricing</Link></li>
                <li><Link href="/languages" className="text-sm hover:underline">Languages</Link></li>
                <li><Link href="/mobile" className="text-sm hover:underline">Mobile App</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                <li><Link href="/careers" className="text-sm hover:underline">Careers</Link></li>
                <li><Link href="/blog" className="text-sm hover:underline">Blog</Link></li>
                <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm hover:underline">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-sm hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-black/20 mt-8 pt-8 flex flex-wrap justify-between items-center">
            <div className="text-sm">© {new Date().getFullYear()} Lingua-Learn. All rights reserved.</div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-purple-600">Twitter</Link>
              <Link href="#" className="hover:text-purple-600">Instagram</Link>
              <Link href="#" className="hover:text-purple-600">Facebook</Link>
              <Link href="#" className="hover:text-purple-600">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
