import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
        <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            LINGUA-LEARN
          </Link>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="font-bold hover:underline">Features</Link>
            <Link href="/pricing" className="font-bold hover:underline">Pricing</Link>
            <Link href="/about" className="font-bold hover:underline">About</Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Choose the plan that works best for your language learning journey. All plans include our core features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-black">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Perfect for casual learners</p>
              </div>
              
              <Button 
                className="w-full bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
              >
                Get Started
              </Button>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>1 language</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Basic speaking exercises</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Limited AI feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Basic progress tracking</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-500">Sunrise & Sunset sessions</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-500">Advanced pronunciation analysis</span>
                </li>
              </ul>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <div className="bg-purple-600 text-white px-4 py-1 rounded-full font-bold text-sm">
                  Most Popular
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold">Premium</h3>
                <div className="mt-4">
                  <span className="text-4xl font-black">$9.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">For dedicated language learners</p>
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
              >
                Start 14-Day Free Trial
              </Button>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>5 languages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>All speaking exercises</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Full AI feedback & coaching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Detailed progress analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Sunrise & Sunset sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Basic pronunciation analysis</span>
                </li>
              </ul>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="mt-4">
                  <span className="text-4xl font-black">$19.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">For language enthusiasts</p>
              </div>
              
              <Button 
                className="w-full bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
              >
                Start 14-Day Free Trial
              </Button>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Unlimited languages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>All speaking exercises</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Premium AI feedback & coaching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Advanced progress analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Customized Sunrise & Sunset sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>Advanced pronunciation analysis</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-black mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/50 backdrop-blur-sm border-2 border-black rounded-xl p-6">
                <h3 className="font-bold mb-2">Can I switch plans later?</h3>
                <p>Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border-2 border-black rounded-xl p-6">
                <h3 className="font-bold mb-2">Is there a refund policy?</h3>
                <p>We offer a 14-day money-back guarantee if you're not satisfied with your premium subscription.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border-2 border-black rounded-xl p-6">
                <h3 className="font-bold mb-2">How many devices can I use?</h3>
                <p>You can use Lingua-Learn on unlimited devices with the same account, allowing you to practice anywhere.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border-2 border-black rounded-xl p-6">
                <h3 className="font-bold mb-2">What languages are available?</h3>
                <p>We currently support 25+ languages including Spanish, French, German, Japanese, Mandarin, Italian, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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