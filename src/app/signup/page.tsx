"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    
    if (id === "terms") {
      setTermsAccepted(checked)
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!termsAccepted) {
      setError("You must accept the Terms of Service and Privacy Policy")
      return
    }
    
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Redirect to dashboard on successful registration
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
        <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            LINGUA-LEARN
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-md border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-sm font-medium hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
            
            <h1 className="text-3xl font-black mb-6">Create Your Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-bold">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="border-2 border-black rounded-xl p-3"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-bold">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="border-2 border-black rounded-xl p-3"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="border-2 border-black rounded-xl p-3"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-bold">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="border-2 border-black rounded-xl p-3"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                  <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                </div>
                
                <div className="flex items-start gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1"
                    checked={termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p>Already have an account? {" "}
                <Link href="/login" className="text-purple-600 font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm">Access to all basic features</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm">10-minute daily practice sessions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm">Progress tracking and statistics</span>
                </div>
              </div>
            
              <Button 
                variant="outline" 
                className="w-full justify-center rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3"
                disabled={isLoading}
                onClick={() => alert("Social login not implemented yet")}
              >
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-center rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                disabled={isLoading}
                onClick={() => alert("Social login not implemented yet")}
              >
                Continue with Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 