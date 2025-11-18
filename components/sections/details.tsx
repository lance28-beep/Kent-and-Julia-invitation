"use client"

import { useState, useEffect } from "react"
import { Clock, Utensils, Car, Shirt, Navigation, Heart, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"

export function Details() {
  const [isVisible, setIsVisible] = useState(false)

  // Updated venue information
  const ceremonyVenue = "San Roque Parish"
  const ceremonyAddress = "Cordova, Cebu, Philippines"
  const ceremonyFull = `${ceremonyVenue}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyFull)}`
  
  const receptionVenue = "Privé by the Sea"
  const receptionAddress = "Cebu, Philippines"
  const receptionFull = `${receptionVenue}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionFull)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
      {/* Enhanced Header with Animation */}
      <div className={`relative z-10 text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6 px-3 sm:px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
            Event Details
          </h2>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Enhanced Schedule Section with Animation */}
      <div className={`relative z-10 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        <div 
          className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#BC9751]/60 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 group"
        >
          {/* Enhanced glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#BC9751]/15 to-[#51181E]/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

          {/* Content Section */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-10 relative z-10">
            {/* Date with enhanced styling */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <div className="inline-block mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#BC9751]/20 to-[#BC9751]/10 rounded-full blur-xl scale-150 opacity-50"></div>
                <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-[#51181E] mb-2">
                  January 22, 2026
              </p>
              </div>
              
              {/* Schedule Times with enhanced cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {/* Arrival */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-4 sm:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg hover:border-[#BC9751]/60 transition-all duration-300 hover:scale-[1.02] group/item">
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2.5">
                    <div className="bg-[#51181E]/10 p-1.5 sm:p-2 rounded-lg group-hover/item:bg-[#51181E]/20 transition-colors">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#51181E] flex-shrink-0" />
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E]">Arrival</h4>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#51181E]">2:00 PM</p>
                </div>

                {/* Ceremony */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-4 sm:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg hover:border-[#BC9751]/60 transition-all duration-300 hover:scale-[1.02] group/item">
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2.5">
                    <div className="bg-[#51181E]/10 p-1.5 sm:p-2 rounded-lg group-hover/item:bg-[#51181E]/20 transition-colors">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#51181E] flex-shrink-0" fill="currentColor" />
                  </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E]">Ceremony</h4>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#51181E]">2:30 PM</p>
                </div>

                {/* Reception */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-4 sm:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg hover:border-[#BC9751]/60 transition-all duration-300 hover:scale-[1.02] group/item">
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2.5">
                    <div className="bg-[#51181E]/10 p-1.5 sm:p-2 rounded-lg group-hover/item:bg-[#51181E]/20 transition-colors">
                      <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#51181E] flex-shrink-0" />
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E]">Reception</h4>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#51181E]">6:00 PM</p>
                </div>

                {/* After Party */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-4 sm:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg hover:border-[#BC9751]/60 transition-all duration-300 hover:scale-[1.02] group/item">
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2.5">
                    <div className="bg-[#51181E]/10 p-1.5 sm:p-2 rounded-lg group-hover/item:bg-[#51181E]/20 transition-colors">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#51181E] flex-shrink-0" />
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E]">After Party</h4>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#51181E]">10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Venue Locations with Animation */}
      <div className={`relative z-10 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '400ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Ceremony Venue */}
          <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#BC9751]/60 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/80 transition-all duration-300 group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            {/* Venue Image */}
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
              <Image
                src="/Details/ceremony.png"
                alt={ceremonyVenue}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg leading-tight">
                  {ceremonyVenue}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">
                  {ceremonyAddress}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 relative z-10">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-[#51181E] hover:bg-[#6D2028] text-[#FFFFFF] rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                aria-label="Get directions to ceremony venue"
              >
                <Navigation className="w-4 h-4 flex-shrink-0" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Reception Venue */}
          <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#BC9751]/60 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/80 transition-all duration-300 group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            {/* Venue Image */}
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
              <Image
                src="/Details/recepcion.png"
                alt={receptionVenue}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg leading-tight">
                  {receptionVenue}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">
                  {receptionAddress}
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 relative z-10">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-[#51181E] hover:bg-[#6D2028] text-[#FFFFFF] rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                aria-label="Get directions to reception venue"
              >
                <Navigation className="w-4 h-4 flex-shrink-0" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Additional Information with Animation */}
      <div className={`relative z-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '600ms' }}>
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="relative inline-block mb-4 sm:mb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-[#BC9751]/30 via-[#BC9751]/20 to-[#BC9751]/30 rounded-full blur-2xl scale-150 animate-pulse"></div>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#51181E] via-[#6D2028] to-[#51181E] rounded-full flex items-center justify-center mx-auto shadow-2xl border-2 border-[#BC9751]/30">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-[#FFFFFF] drop-shadow-lg" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4 text-[#FFFFFF] drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">Important Information</h3>
          <div className="h-px w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Attire Guide */}
          <div className="bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-[#BC9751]/60 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/80 transition-all duration-300 group overflow-hidden">
            {/* Subtle glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="bg-[#51181E]/10 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Shirt className="text-[#51181E] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-[#51181E]">Attire Guide</h4>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Guests & Family */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-3 sm:p-4 md:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#51181E] to-[#BC9751] rounded-full"></div>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E]">Guests & Family</p>
                </div>
                  <div className="inline-block bg-[#51181E]/10 px-3 py-1 rounded-full mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm font-semibold text-[#51181E]">Semi-Formal</p>
                  </div>
                  <div className="space-y-2 mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-[#51181E]/80 leading-relaxed">
                      We encourage our guests to dress according to our wedding colors.
                    </p>
                    <p className="text-xs sm:text-sm text-[#51181E]/80 leading-relaxed">
                      For ladies, white attire is reserved for the bride. Please refrain from wearing denim jeans, shorts, shirts and slippers.
                  </p>
                </div>

                {/* Color Palette */}
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm font-semibold text-[#51181E] mb-2 sm:mb-3">Wedding Colors</p>
                    <div className="flex gap-2 sm:gap-2.5 md:gap-3 flex-wrap justify-center">
                      {['#51181E', '#800020', '#6D2028', '#C79B42', '#DAB370', '#F6E1B6'].map((color, index) => (
                      <div
                        key={index}
                          className="relative group/color"
                        >
                          <div
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg border-2 border-[#BC9751]/40 hover:border-[#BC9751]/60 transition-all duration-300 hover:scale-110 cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            <span className="text-[10px] text-[#51181E] font-mono bg-[#F6E4CC] px-1.5 py-0.5 rounded whitespace-nowrap shadow-md">{color}</span>
                          </div>
                        </div>
                    ))}
                    </div>
                  </div>
                </div>

                {/* Principal Sponsors */}
                <div className="bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 rounded-xl p-3 sm:p-4 md:p-5 border-2 border-[#BC9751]/40 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group/sponsor">
                  {/* Sponsors Image - Full Aspect Ratio (437 x 571) */}
                  <div className="relative w-full mb-3 sm:mb-4 rounded-lg overflow-hidden" style={{ aspectRatio: '437 / 571' }}>
                    <Image
                      src="/Details/Guest.png"
                      alt="Principal Sponsors Attire"
                      fill
                      className="object-contain transition-transform duration-500 group-hover/sponsor:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                    />
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-[#51181E] mb-2 sm:mb-2.5">Principal Sponsors</p>
                  <p className="text-xs sm:text-sm text-[#51181E]/80 leading-relaxed">
                    For our beloved principal Sponsors, we kindly request to wear champagne long gowns and Barong Tagalog.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Parking & Travel */}
          <div className="bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-[#BC9751]/60 shadow-xl hover:shadow-2xl hover:border-[#BC9751]/80 transition-all duration-300 group overflow-hidden">
            {/* Subtle glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="bg-[#51181E]/10 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Car className="text-[#51181E] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-[#51181E]">Parking & Travel</h4>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-[#BC9751]/10 rounded-lg p-3 sm:p-4 border-2 border-[#BC9751]/30">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#51181E] mb-1.5 sm:mb-2">Parking Available</p>
                  <p className="text-xs sm:text-sm text-[#51181E]/80 leading-relaxed">
                    Ample parking is available at the venue. We recommend arriving 15-20 minutes early.
                  </p>
                </div>

                <div className="bg-[#BC9751]/10 rounded-lg p-3 sm:p-4 border-2 border-[#BC9751]/30">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#51181E] mb-1.5 sm:mb-2">Transportation</p>
                  <p className="text-xs sm:text-sm text-[#51181E]/80 leading-relaxed">
                    Taxis, Grab, and private vehicles are welcome. The venue is easily accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

