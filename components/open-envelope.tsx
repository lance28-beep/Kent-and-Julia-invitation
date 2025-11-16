"use client"

import { useEffect, useState } from "react"

export function OpenEnvelope() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Envelope Container */}
      <div 
        className={`relative mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ perspective: "1000px", maxWidth: "400px" }}
      >
        {/* Envelope Back - Open */}
        <div
          className="relative bg-[#51181E] rounded-lg shadow-2xl mx-auto animate-float"
          style={{
            width: "100%",
            height: "280px",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            filter: "drop-shadow(0 20px 40px rgba(81, 24, 30, 0.3))",
          }}
        >
          {/* Envelope Flap - Open (folded back) */}
          <div
            className="absolute -top-8 left-0 right-0 bg-[#51181E] rounded-t-lg origin-top"
            style={{
              height: "80px",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
              transform: "rotateX(-45deg) translateY(-20px)",
              transformStyle: "preserve-3d",
              boxShadow: "0 4px 20px rgba(81, 24, 30, 0.4)",
            }}
          >
            {/* Flap inner side (lighter) */}
            <div
              className="absolute inset-0 bg-[#6b1f26] rounded-t-lg"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
              }}
            />
          </div>

          {/* Letter/Content inside envelope */}
          <div
            className="absolute inset-x-4 top-4 bottom-4 bg-gradient-to-br from-white/98 to-white/95 rounded-lg shadow-lg border-2 border-[#51181E]/20"
            style={{
              transform: "translateY(0)",
            }}
          >
            {/* Decorative border */}
            <div className="absolute inset-0 border border-[#51181E]/10 rounded-lg" />
            
            {/* Letter content placeholder - subtle lines */}
            <div className="absolute inset-0 p-6 sm:p-8">
              <div className="space-y-3">
                <div className="h-px bg-[#51181E]/10 w-3/4" />
                <div className="h-px bg-[#51181E]/10 w-full" />
                <div className="h-px bg-[#51181E]/10 w-5/6" />
                <div className="h-px bg-[#51181E]/10 w-4/5" />
              </div>
            </div>
          </div>

          {/* Envelope border */}
          <div className="absolute inset-0 border-2 border-[#6b1f26] rounded-lg" />
        </div>

        {/* Enhanced decorative shadow */}
        <div
          className="absolute -bottom-6 left-1/2 w-4/5 h-12 bg-[#51181E]/30 rounded-full blur-2xl animate-pulse-slow-envelope"
          style={{
            transform: "translateX(-50%)"
          }}
        />
      </div>

    </div>
  )
}

