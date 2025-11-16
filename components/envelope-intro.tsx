"use client"

import { useEffect, useState } from "react"

interface EnvelopeIntroProps {
  onOpen: () => void
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  useEffect(() => {
    // Prevent body scroll when envelope is visible
    document.body.style.overflow = "hidden"
    
    // Fade in the envelope after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      // Restore body scroll when component unmounts
      document.body.style.overflow = ""
    }
  }, [])

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isOpening) return
    
    setIsOpening(true)
    
    // Show letter after flap opens
    setTimeout(() => {
      setShowLetter(true)
    }, 400)
    
    // Wait for opening animation, then fade out
    setTimeout(() => {
      setIsClosed(true)
      // Restore body scroll
      document.body.style.overflow = ""
      // Call onOpen callback after transition completes
      setTimeout(() => {
        onOpen()
      }, 600)
    }, 1200)
  }

  if (isClosed) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#51181E] via-[#5a1d24] to-[#51181E] transition-opacity duration-700 ${
        isClosed ? "opacity-0" : isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClick}
      onTouchEnd={(e) => {
        e.preventDefault()
        handleClick(e)
      }}
    >
      {/* Enhanced background pattern with animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BC9751]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BC9751]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(188,151,81,0.08)_0%,transparent_60%)]" />
        
        {/* Decorative sparkles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#BC9751] rounded-full opacity-60 animate-pulse-slow"
            style={{
              top: `${20 + i * 15}%`,
              left: `${15 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s',
              boxShadow: '0 0 6px rgba(188, 151, 81, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Envelope Container */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${isOpening ? "scale-110 opacity-0" : ""}`}
        style={{
          animation: isVisible && !isOpening ? "float 6s ease-in-out infinite" : "none",
        }}
      >
        {/* Envelope */}
        <div 
          className="relative w-64 sm:w-80 md:w-96 lg:w-[28rem] aspect-[4/3] mb-8 cursor-pointer group"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "center center",
          }}
        >
          {/* Envelope Base with enhanced depth */}
          <div
            className={`absolute inset-0 rounded-lg transition-all duration-700 ${
              isOpening ? "scale-110" : "group-hover:scale-105"
            }`}
            style={{
              clipPath: isOpening
                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(0% 0%, 100% 0%, 100% 70%, 0% 70%)",
              background: isOpening
                ? "linear-gradient(135deg, #51181E 0%, #3d1216 50%, #51181E 100%)"
                : "linear-gradient(135deg, #51181E 0%, #3d1216 30%, #51181E 100%)",
              boxShadow: isOpening 
                ? "0 0 80px rgba(188, 151, 81, 0.5), 0 0 120px rgba(81, 24, 30, 0.7), inset 0 0 40px rgba(0, 0, 0, 0.3)"
                : "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(188, 151, 81, 0.25), inset 0 -10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-black/10 to-black/20" />
            
            {/* Decorative corner elements */}
            {!isOpening && (
              <>
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#BC9751]/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#BC9751]/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#BC9751]/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#BC9751]/30 rounded-br-lg" />
              </>
            )}
          </div>

          {/* Envelope Flap (opens when clicked) */}
          <div
            className={`absolute top-0 left-0 w-full h-[30%] rounded-t-lg origin-top transition-all duration-700 ease-out ${
              isOpening ? "" : "group-hover:shadow-lg"
            }`}
            style={{
              background: "linear-gradient(135deg, #6D2028 0%, #51181E 50%, #5a1d24 100%)",
              transform: isOpening ? "rotateX(-180deg) translateZ(0)" : "rotateX(0deg) translateZ(0)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              opacity: isOpening ? 0 : 1,
              boxShadow: isOpening 
                ? "none"
                : "0 -5px 20px rgba(0, 0, 0, 0.4), inset 0 5px 10px rgba(188, 151, 81, 0.1)",
            }}
          >
            {/* Flap inner lining with elegant pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F6E4CC]/25 via-[#F6E4CC]/15 to-transparent rounded-t-lg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(188,151,81,0.1)_0%,transparent_70%)] rounded-t-lg" />
            
            {/* Flap decorative edge */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BC9751]/40 to-transparent" />
          </div>

          {/* Enhanced Wax Seal */}
          {!isOpening && (
            <div 
              className="absolute top-[25%] left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: "radial-gradient(circle, rgba(188,151,81,0.4) 0%, rgba(188,151,81,0.2) 50%, rgba(188,151,81,0.1) 100%)",
                border: "3px solid rgba(188, 151, 81, 0.5)",
                boxShadow: "0 0 30px rgba(188, 151, 81, 0.6), 0 0 60px rgba(188, 151, 81, 0.3), inset 0 0 30px rgba(188, 151, 81, 0.3)",
                animationDuration: "3s",
              }}
            >
              {/* Inner seal design */}
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-[#BC9751]/40"
                style={{
                  background: "radial-gradient(circle, rgba(188,151,81,0.3) 0%, rgba(188,151,81,0.1) 100%)",
                  boxShadow: "inset 0 0 15px rgba(188, 151, 81, 0.4)",
                }}
              >
                {/* Center decorative element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#BC9751] rounded-full" style={{ boxShadow: "0 0 8px rgba(188, 151, 81, 0.8)" }} />
                </div>
              </div>
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-50"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                  animation: "shimmer 3s infinite",
                }}
              />
            </div>
          )}

          {/* Message Text with enhanced typography */}
          <div
            className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-500 ${
              isOpening ? "opacity-0 translate-y-4 scale-95" : "opacity-100"
            }`}
          >
            <div
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p
                className="text-white font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wider mb-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 25px rgba(0, 0, 0, 0.6), 0 4px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(188, 151, 81, 0.2)",
                  letterSpacing: "0.05em",
                }}
              >
                You are invited
              </p>
              <div className="flex items-center justify-center gap-2 my-3">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                <div className="w-1.5 h-1.5 bg-[#BC9751] rounded-full" style={{ boxShadow: "0 0 8px rgba(188, 151, 81, 0.8)" }} />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent via-[#BC9751]/60 to-transparent" />
              </div>
              <p
                className="text-[#BC9751] font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 20px rgba(188, 151, 81, 0.4), 0 0 30px rgba(188, 151, 81, 0.2)",
                  letterSpacing: "0.03em",
                }}
              >
                to the wedding.
              </p>
            </div>
          </div>
          
          {/* Letter that slides out when opening */}
          {showLetter && (
            <div
              className="absolute inset-0 flex items-center justify-center px-6 animate-fade-in-scale"
              style={{
                animation: "slideOut 0.8s ease-out forwards",
                transform: "translateY(-20px)",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#BC9751] to-transparent mx-auto mb-4 animate-expand" />
                <p className="text-[#BC9751] text-sm sm:text-base md:text-lg font-light tracking-widest uppercase">
                  Opening...
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Enhanced Tap/Click Hint */}
        {!isOpening && (
          <div
            className={`text-white/80 text-sm sm:text-base md:text-lg font-light tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: "1.2s" }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-center">
                Tap to open
                <span className="hidden sm:inline"> or click</span>
              </p>
              {/* Animated arrow/chevron */}
              <div 
                className="animate-bounce"
                style={{ animationDuration: "1.5s", animationDelay: "1.5s" }}
              >
                <svg 
                  className="w-5 h-5 text-white/60" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
