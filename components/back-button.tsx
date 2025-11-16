"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
    // Ensure page scrolls to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-b from-[#51181E]/95 via-[#6D2028]/95 to-transparent backdrop-blur-md border-b border-[#BC9751]/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16">
    <button
      onClick={handleBack}
      type="button"
            className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#F6E4CC]/10 hover:bg-[#F6E4CC]/20 border border-[#BC9751]/30 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md hover:border-[#BC9751]/50 active:scale-95 transition-all duration-300"
    >
      <ArrowLeft 
              size={18}
              className="text-[#F6E4CC] group-hover:text-[#BC9751] transition-colors duration-300" 
      />
            <span className="text-[#F6E4CC] font-sans font-semibold text-xs sm:text-sm group-hover:text-[#BC9751] transition-colors duration-300 hidden sm:inline">
              Back
      </span>
    </button>
        </div>
      </div>
    </nav>
  )
}

