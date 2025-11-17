"use client"

import { Heart, Gift, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export function Registry() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div id="registry" className="relative min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
      {/* Enhanced Section Header with Animation */}
      <div className={`relative z-10 text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6 px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
            Gift Guide
          </h2>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>

      {/* Enhanced Content with Animation */}
      <div className={`relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        {/* Enhanced card with new color scheme */}
        <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 overflow-hidden group">
          {/* Enhanced glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          {/* Inner border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#BC9751]/30 rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 z-10">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
              {/* Header with gift icon */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751]" />
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-bold text-[#51181E] text-center">
                  Your Presence Is the Gift
                </h3>
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751]" />
              </div>
              
              {/* Main message */}
              <div className="text-center space-y-3 sm:space-y-4 max-w-2xl px-2 sm:px-4">
                <div className="relative py-4 sm:py-6 md:py-8">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#BC9751]/50 to-transparent"></div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#51181E] leading-relaxed font-sans">
                      With all that we have, we are truly blessed.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#51181E] leading-relaxed font-sans">
                      Your presence and prayers are all that we request,
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#51181E] leading-relaxed font-sans">
                      as our day is complete having you as a guest.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#51181E] leading-relaxed font-sans pt-2 sm:pt-3">
                      But if you desire, nonetheless,
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#51181E] leading-relaxed font-sans font-semibold">
                      a monetary gift is one we humbly request.
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#BC9751]/50 to-transparent"></div>
                </div>
              </div>
              
              {/* Closing message */}
              <p className="text-sm sm:text-base md:text-lg text-[#6D2028] font-semibold text-center pt-2 sm:pt-4 font-sans">
                We look forward to celebrating with you soon. ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
