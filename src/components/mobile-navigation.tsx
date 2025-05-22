import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function MobileNavigation() {
  return (
    <div className="h-full bg-white/40 backdrop-blur-md flex flex-col">
      <div className="p-6 border-b-4 border-black">
        <h2 className="text-2xl font-black">LINGUA-LEARN</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-2 mb-8">
          <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 bg-black text-white rounded-xl">
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
            Progress
          </Link>
          <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
            Schedule
          </Link>
          <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
            Community
          </Link>
        </nav>

        <div>
          <h2 className="text-xl font-black mb-4">MY LANGUAGES</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold">
              <Globe className="h-5 w-5" /> Spanish
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold">
              <Globe className="h-5 w-5" /> French
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold">
              <Globe className="h-5 w-5" /> Japanese
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold">
              <Globe className="h-5 w-5" /> German
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t-4 border-black">
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold">
            Profile
          </Button>
          <Button variant="outline" className="rounded-xl border-2 border-black font-bold">
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
