"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, MapPin, Church, Calendar, Clock } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => setShowInvitation(true), 300)
    setTimeout(() => setShowCountdown(true), 600)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: January 22, 2026 at 2:30 PM GMT+8
      // 2:30 PM GMT+8 == 06:30 AM UTC
      const targetDate = Date.UTC(2026, 0, 22, 6, 30, 0) // January is month 0
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden min-h-screen">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#BC9751]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#BC9751]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BC9751]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="w-full max-w-5xl text-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
          {/* Subtle decorative elements */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#BC9751]/30 to-transparent" />
          {/* Romantic Copywriting Section */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* First Line */}
            <div className={`space-y-4 sm:space-y-5 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-[#FFFFFF]/95 drop-shadow-lg tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase">
                WITH JOYFUL HEARTS, WE INVITE YOU TO CELEBRATE
              </p>
              
              {/* Decorative divider with enhanced animation */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-3">
                <div className="h-px w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
                <Heart size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
                <Sparkles size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#BC9751]/90 drop-shadow-lg animate-spin-slow" />
                <Heart size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="h-px w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
              </div>

              {/* Couple Names */}
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.02em] sm:tracking-[0.03em] md:tracking-[0.04em] drop-shadow-2xl leading-tight"
                style={{
                  color: '#FFFFFF',
                  textShadow: "0 4px 30px rgba(188, 151, 81, 0.5), 0 8px 50px rgba(81, 24, 30, 0.7), 0 12px 80px rgba(0, 0, 0, 0.6)",
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="inline-block transform transition-all duration-700 hover:scale-110 hover:text-[#BC9751]/90">
                  Kent
                </span>
                <span className="mx-3 sm:mx-4 md:mx-5 lg:mx-6 text-[#BC9751] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-lg">&</span>
                <span className="inline-block transform transition-all duration-700 hover:scale-110 hover:text-[#BC9751]/90">
                  Julia
                </span>
              </h1>
            </div>

            {/* Second Section - Invitation Text */}
            <div className={`pt-8 sm:pt-10 md:pt-12 mb-0 pb-0 transition-all duration-1000 ease-out delay-300 ${
              showInvitation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Decorative divider with glow */}
              <div className="h-0.5 sm:h-1 md:h-1.5 w-24 sm:w-32 md:w-40 lg:w-48 mx-auto bg-gradient-to-r from-transparent via-[#BC9751] to-transparent shadow-[0_0_15px_rgba(188,151,81,0.6)] animate-expand mb-5 sm:mb-6 md:mb-7 lg:mb-8" style={{ animationDelay: '0.6s' }} />
              
              <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 px-4 sm:px-6 md:px-8 lg:px-12 mb-0 pb-0">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#FFFFFF]/98 drop-shadow-xl leading-relaxed bonheur-royale-regular mb-0 pb-0">
                  Together with our beloved families,
                </p>
                
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#FFFFFF]/98 drop-shadow-xl leading-relaxed bonheur-royale-regular mb-0 pb-0">
                  we humbly request the honor of your presence
                </p>
                
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#FFFFFF]/98 drop-shadow-xl leading-relaxed bonheur-royale-regular mb-0 pb-0">
                  as we unite in marriage and begin our journey together.
                </p>
              </div>
            </div>

            {/* Countdown Section */}
            <div className={`space-y-8 sm:space-y-10 md:space-y-12 pt-10 sm:pt-12 md:pt-14 lg:pt-16 transition-all duration-1000 ease-out delay-500 ${
              showCountdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Date and Time Display */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 bg-white/5 backdrop-blur-md rounded-2xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 border border-[#BC9751]/20 shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751]" />
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#FFFFFF] drop-shadow-lg">
                    January 22, 2026
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751]" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#BC9751] drop-shadow-lg bonheur-royale-regular">
                    2:30 in the Afternoon
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl px-6 py-5 sm:px-8 sm:py-6 md:px-7 md:py-5 lg:px-8 lg:py-6 border border-[#BC9751]/40 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/60 transition-all duration-300 w-full sm:w-auto min-w-[130px] sm:min-w-[150px] md:min-w-[120px] lg:min-w-[140px]">
                    <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] text-center drop-shadow-lg">
                      {String(timeLeft.days).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#BC9751]/90 mt-3 uppercase tracking-wider font-medium">
                    Days
                  </span>
                </div>
                <div className="hidden md:flex items-center text-[#BC9751] text-3xl sm:text-4xl lg:text-5xl font-light animate-pulse">:</div>

                <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl px-6 py-5 sm:px-8 sm:py-6 md:px-7 md:py-5 lg:px-8 lg:py-6 border border-[#BC9751]/40 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/60 transition-all duration-300 w-full sm:w-auto min-w-[130px] sm:min-w-[150px] md:min-w-[120px] lg:min-w-[140px]">
                    <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] text-center drop-shadow-lg">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#BC9751]/90 mt-3 uppercase tracking-wider font-medium">
                    Hours
                  </span>
                </div>

                <div className="hidden md:flex items-center text-[#BC9751] text-3xl sm:text-4xl lg:text-5xl font-light animate-pulse">:</div>

                <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl px-6 py-5 sm:px-8 sm:py-6 md:px-7 md:py-5 lg:px-8 lg:py-6 border border-[#BC9751]/40 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/60 transition-all duration-300 w-full sm:w-auto min-w-[130px] sm:min-w-[150px] md:min-w-[120px] lg:min-w-[140px]">
                    <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] text-center drop-shadow-lg">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#BC9751]/90 mt-3 uppercase tracking-wider font-medium">
                    Minutes
                  </span>
                </div>

                <div className="hidden md:flex items-center text-[#BC9751] text-3xl sm:text-4xl lg:text-5xl font-light animate-pulse" style={{ animationDelay: '0.5s' }}>:</div>

                <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl px-6 py-5 sm:px-8 sm:py-6 md:px-7 md:py-5 lg:px-8 lg:py-6 border border-[#BC9751]/40 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/60 transition-all duration-300 w-full sm:w-auto min-w-[130px] sm:min-w-[150px] md:min-w-[120px] lg:min-w-[140px]">
                    <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] text-center drop-shadow-lg">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#BC9751]/90 mt-3 uppercase tracking-wider font-medium">
                    Seconds
                  </span>
                </div>
              </div>

              {/* Venue and Ceremony Information */}
              <div className="space-y-6 sm:space-y-8 pt-10 sm:pt-12 md:pt-14">
                {/* Decorative divider */}
                <div className="h-px w-32 sm:w-40 md:w-48 lg:w-56 mx-auto bg-gradient-to-r from-transparent via-[#BC9751]/50 to-transparent shadow-[0_0_10px_rgba(188,151,81,0.3)]" />
                
                {/* Save the Date */}
                <p className="text-sm sm:text-base md:text-lg text-[#BC9751] font-light tracking-[0.25em] uppercase text-center drop-shadow-lg font-sans">
                  Save the Date
                </p>

                {/* Venue and Ceremony Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
                  {/* Ceremony Card */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 border border-[#BC9751]/30 shadow-lg hover:shadow-xl hover:border-[#BC9751]/50 hover:scale-105 transition-all duration-300 transform group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 flex-shrink-0 p-2 sm:p-2.5 bg-[#BC9751]/20 rounded-lg group-hover:bg-[#BC9751]/30 transition-colors">
                        <Church className="w-5 h-5 sm:w-6 sm:h-6 text-[#BC9751]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-[#BC9751] font-semibold uppercase tracking-wide mb-2 sm:mb-3 font-sans">
                          Ceremony
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm sm:text-base md:text-lg text-[#FFFFFF] font-semibold leading-relaxed font-sans">
                            San Roque Parish
                          </p>
                          <p className="text-xs sm:text-sm text-[#F6E4CC]/80 font-light leading-relaxed font-sans">
                            Cordova, Cebu
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Venue Card */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 border border-[#BC9751]/30 shadow-lg hover:shadow-xl hover:border-[#BC9751]/50 hover:scale-105 transition-all duration-300 transform group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 flex-shrink-0 p-2 sm:p-2.5 bg-[#BC9751]/20 rounded-lg group-hover:bg-[#BC9751]/30 transition-colors">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#BC9751]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-[#BC9751] font-semibold uppercase tracking-wide mb-2 sm:mb-3 font-sans">
                          Venue
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm sm:text-base md:text-lg text-[#FFFFFF] font-semibold leading-relaxed font-sans">
                            Privé By The Sea
                          </p>
                          <p className="text-xs sm:text-sm text-[#F6E4CC]/80 font-light leading-relaxed font-sans">
                            Vistamar Beach & Residential Estates, Lapu-Lapu City, Cebu
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
