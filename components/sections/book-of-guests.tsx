"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()
    setIsVisible(true)

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-[55] isolate py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Enhanced Section Header with Animation */}
      <div className={`relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 pt-2 sm:pt-4 md:pt-6 px-3 sm:px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
            Book of Guests
          </h2>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Enhanced Guests content with Animation */}
      <div className={`relative z-10 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        {/* Stats card */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-3 md:px-4 lg:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 overflow-hidden group">
              {/* Enhanced glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
              {/* Inner border */}
              <div className="absolute inset-1.5 sm:inset-2 md:inset-3 lg:inset-4 border border-[#BC9751]/30 rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-3 sm:mb-4 md:mb-6">
                  <div className="bg-gradient-to-br from-[#51181E] to-[#6D2028] p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg">
                    <Heart className="text-[#FFFFFF] h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:h-5 lg:h-6 lg:w-6" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-sans font-bold text-[#51181E]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#51181E]/70 font-sans mt-0.5 sm:mt-1">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-[#51181E]/80 font-sans leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
          <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-10 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 overflow-hidden group">
            {/* Enhanced glow effects */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            {/* Inner border */}
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 lg:inset-4 border border-[#BC9751]/30 rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#51181E]" />
                  <span className="text-[#51181E] font-sans text-xs sm:text-sm md:text-base lg:text-lg">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                  <p className="text-red-500 font-sans text-xs sm:text-sm md:text-base lg:text-lg mb-2">{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#51181E] to-[#6D2028] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FFFFFF]" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-[#51181E] mb-1 sm:mb-2">
                    No guests have RSVP'd yet
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#51181E]/70 font-sans max-w-md mx-auto leading-relaxed">
                    Be the first to RSVP and kick off the celebration!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 border-2 border-[#BC9751]/30 hover:border-[#BC9751]/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      {/* Avatar */}
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#51181E] to-[#6D2028] text-[#FFFFFF] flex items-center justify-center font-semibold shadow-md ring-2 ring-white text-[10px] sm:text-xs md:text-sm lg:text-base font-sans">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 md:gap-3">
                          <div className="flex-1 pr-12 sm:pr-0">
                            <h4 className="font-sans text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#51181E] mb-0.5 sm:mb-1 group-hover:text-[#6D2028] transition-colors duration-200">
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-[10px] sm:text-xs md:text-sm text-[#51181E]/70">
                                <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 sm:mr-1.5 text-[#BC9751] flex-shrink-0" />
                                <span className="font-sans break-all">{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge */}
                          <div className="absolute right-2 top-2 sm:static sm:right-auto sm:top-auto flex items-center gap-1 sm:gap-1.5 md:gap-2">
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#BC9751] flex-shrink-0" />
                            <span className="inline-flex items-center justify-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#BC9751]/10 text-[#6D2028] rounded-full text-[10px] sm:text-xs md:text-sm font-semibold border-2 border-[#BC9751]/30 font-sans">
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        {guest.Message && (
                          <div className="mt-2 sm:mt-2.5 md:mt-3 lg:mt-4 pt-2 sm:pt-2.5 md:pt-3 lg:pt-4 border-t border-[#BC9751]/20">
                            <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#BC9751] flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#51181E]/80 font-sans leading-relaxed italic flex-1">
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
