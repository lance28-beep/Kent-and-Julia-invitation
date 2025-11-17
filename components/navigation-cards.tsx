"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface NavigationCard {
  href: string
  label: string
  copywriting: string
  isCircular?: boolean
  colSpan?: number
  rowSpan?: number
}

const navigationCards: NavigationCard[] = [
  { 
    href: "/gallery", 
    label: "Gallery",
    copywriting: "Browse through our cherished moments and beautiful memories captured in time. Be able to share and upload your photos captured during the events.",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/messages", 
    label: "Messages",
    copywriting: "Send your heartfelt wishes and messages to the couple, and read beautiful messages from other guests just like you. Your words will be treasured forever.",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/venue", 
    label: "Details",
    copywriting: "Find all the important details about our wedding celebration.",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/entourage", 
    label: "Entourage",
    copywriting: "Meet the special people standing with us on our wedding day.",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/snap-share", 
    label: "Snap & Share",
    copywriting: "",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/rsvp", 
    label: "RSVP",
    copywriting: "Search for your name, request an invitation, and see who's invited to our celebration.",
    colSpan: 2,
    rowSpan: 1,
  },
  { 
    href: "/gifts", 
    label: "Registry",
    copywriting: "",
    colSpan: 1,
    rowSpan: 1,
  },
  { 
    href: "/faq", 
    label: "FAQ",
    copywriting: "Find answers to common questions about our wedding.",
    isCircular: true,
    colSpan: 1,
    rowSpan: 1,
  },
]

export function NavigationCards() {
  const [isVisible, setIsVisible] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Once visible, we can disconnect the observer
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before fully in view
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Floral decoration SVG component
  const FloralDecoration = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rose/floral pattern */}
      <path
        d="M50 20 C45 20, 40 25, 40 30 C40 35, 45 40, 50 40 C55 40, 60 35, 60 30 C60 25, 55 20, 50 20 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M50 60 C45 60, 40 65, 40 70 C40 75, 45 80, 50 80 C55 80, 60 75, 60 70 C60 65, 55 60, 50 60 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M20 50 C20 45, 25 40, 30 40 C35 40, 40 45, 40 50 C40 55, 35 60, 30 60 C25 60, 20 55, 20 50 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M60 50 C60 45, 65 40, 70 40 C75 40, 80 45, 80 50 C80 55, 75 60, 70 60 C65 60, 60 55, 60 50 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.25" />
      {/* Decorative leaves */}
      <path
        d="M30 30 Q25 35, 30 40 Q35 35, 30 30"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M70 30 Q75 35, 70 40 Q65 35, 70 30"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M30 70 Q25 65, 30 60 Q35 65, 30 70"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M70 70 Q75 65, 70 60 Q65 65, 70 70"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  )

  return (
    <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle background lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BC9751]/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BC9751]/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced grid with varied sizes */}
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-fr">
          {navigationCards.map((card, index) => {
            // Card type checks (simple assignments are already fast)
            const isRSVP = card.label === "RSVP"
            const isFAQ = card.isCircular
            const isGallery = card.label === "Gallery"
            const isMessages = card.label === "Messages"
            const isDetails = card.label === "Details"
            const isEntourage = card.label === "Entourage"
            const isSnapShare = card.label === "Snap & Share"
            const isRegistry = card.label === "Registry"
            
            return (
            <Link
              key={card.href}
              href={card.href}
              prefetch={true}
              onClick={() => setNavigatingTo(card.href)}
              className={`group relative overflow-hidden transition-all duration-500 ease-out ${
                isVisible ? (navigatingTo === card.href ? 'opacity-75 scale-[0.98] translate-y-0' : 'opacity-100 translate-y-0') : 'opacity-0 translate-y-8'
              } ${
                isFAQ 
                  ? 'rounded-full aspect-square justify-self-center md:col-start-2 md:col-span-2 md:justify-self-center' 
                  : isRSVP 
                    ? 'md:col-span-2 aspect-[3/4] md:aspect-[6/4]' 
                    : 'aspect-[3/4]'
              } ${
                isMessages 
                  ? 'bg-[#6D2028] border-[#BC9751]/50' 
                  : isEntourage
                    ? 'bg-[#BC9751]/20 border-[#BC9751]/50'
                    : isSnapShare
                      ? 'bg-[#51181E] border-[#BC9751]/50'
                      : isRSVP
                        ? 'bg-[#6D2028] border-[#BC9751]/50'
                        : isFAQ
                          ? 'bg-[#BC9751]/30 border-[#BC9751]/50'
                          : 'bg-[#F6E4CC] border-[#BC9751]/40'
              } backdrop-blur-sm border shadow-lg hover:shadow-2xl hover:border-[#BC9751]/60 hover:scale-[1.03] hover:z-50 active:scale-[0.98] flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 cursor-pointer`}
              style={{
                transitionDelay: `${index * 50}ms`,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 50}ms both` : 'none',
              }}
            >
              {/* Gallery card special decorations */}
              {isGallery && (
                <>
                  {/* Top left corner flower decoration */}
                  <div className="absolute top-0 left-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300 z-0">
                    <Image
                      src="/decoration/Left-corner-top.png"
                      alt=""
                      aria-hidden="true"
                      width={128}
                      height={128}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 select-none pointer-events-none"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  
                  {/* Bottom right corner flower decoration (rotated) */}
                  <div className="absolute bottom-0 right-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300 z-0 rotate-180">
                    <Image
                      src="/decoration/Left-corner-top.png"
                      alt=""
                      aria-hidden="true"
                      width={128}
                      height={128}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 select-none pointer-events-none"
                      loading="lazy"
                      quality={75}
                    />
                  </div>

                  {/* Photo collage elements - decorative frames */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
                    {/* Top left photo frame */}
                    <div className="absolute top-6 left-4 sm:top-8 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#51181E]/30 to-[#6D2028]/30 border-2 border-[#BC9751]/40 rounded-sm rotate-[-8deg] shadow-md" />
                    {/* Top right photo frame */}
                    <div className="absolute top-8 right-5 sm:top-12 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#6D2028]/30 to-[#51181E]/30 border-2 border-[#BC9751]/40 rounded-sm rotate-[12deg] shadow-md" />
                    {/* Bottom center photo frame */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 sm:bottom-16 w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[-5deg] shadow-md" />
                    {/* Bottom right photo frame */}
                    <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-gradient-to-br from-[#51181E]/30 to-[#BC9751]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[8deg] shadow-md" />
                  </div>
                </>
              )}

              {/* Messages card - Envelope style decorations */}
              {isMessages && (
                <>
                  {/* Envelope flap at top */}
                  <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-[#51181E]/80 to-[#6D2028]/60 border-b-2 border-[#BC9751]/30 z-0">
                    {/* Envelope flap triangle */}
                    <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] sm:border-l-[50px] md:border-l-[60px] border-r-[40px] sm:border-r-[50px] md:border-r-[60px] border-t-[30px] sm:border-t-[40px] md:border-t-[50px] border-l-transparent border-r-transparent border-t-[#51181E]/90" />
                  </div>
                  
                  {/* Envelope seal/wax seal decoration */}
                  <div className="absolute top-8 sm:top-10 md:top-12 right-4 sm:right-6 md:right-8 z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#BC9751]/40 to-[#BC9751]/60 border-2 border-[#BC9751]/50 shadow-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#F6E4CC]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Envelope lines (writing lines) */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                    <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 space-y-2 sm:space-y-3">
                      <div className="h-px bg-[#F6E4CC]/30 w-full" />
                      <div className="h-px bg-[#F6E4CC]/30 w-3/4" />
                      <div className="h-px bg-[#F6E4CC]/30 w-5/6" />
                    </div>
                  </div>
                </>
              )}

              {/* Details card - Map style decorations with broken lines */}
              {isDetails && (
                <>
                  {/* Map grid background */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#51181E" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                    </svg>
                  </div>

                  {/* Broken/dashed route lines */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
                    {/* Main route line - diagonal */}
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M 20 20 Q 40 60, 80 40 T 160 60"
                        fill="none"
                        stroke="#BC9751"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      {/* Secondary route line */}
                      <path
                        d="M 100 80 Q 120 100, 140 90 T 180 110"
                        fill="none"
                        stroke="#51181E"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Location pin markers */}
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#51181E]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>

                  {/* Compass rose decoration */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="2" x2="12" y2="6"/>
                      <line x1="12" y1="18" x2="12" y2="22"/>
                      <line x1="2" y1="12" x2="6" y2="12"/>
                      <line x1="18" y1="12" x2="22" y2="12"/>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                    </svg>
                  </div>

                  {/* Additional broken lines for map style */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* Horizontal broken lines */}
                      <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#BC9751" strokeWidth="1" strokeDasharray="2 3" />
                      <line x1="15%" y1="70%" x2="85%" y2="70%" stroke="#51181E" strokeWidth="1" strokeDasharray="2 3" />
                      {/* Vertical broken lines */}
                      <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#BC9751" strokeWidth="1" strokeDasharray="2 3" />
                      <line x1="70%" y1="15%" x2="70%" y2="85%" stroke="#51181E" strokeWidth="1" strokeDasharray="2 3" />
                    </svg>
                  </div>
                </>
              )}

              {/* Entourage card - People/group style decorations */}
              {isEntourage && (
                <>
                  {/* People silhouettes - decorative group */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                    {/* Person 1 - Left */}
                    <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-8">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#51181E]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 2 - Center Left */}
                    <div className="absolute bottom-6 left-1/4 sm:bottom-8">
                      <svg className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 text-[#6D2028]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 3 - Center */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:bottom-12">
                      <svg className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 4 - Center Right */}
                    <div className="absolute bottom-6 right-1/4 sm:bottom-8">
                      <svg className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 text-[#6D2028]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 5 - Right */}
                    <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-8">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#51181E]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Decorative connecting lines between people */}
                  <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-0 right-0 pointer-events-none z-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                    <svg className="w-full h-8" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M 20 20 Q 50 10, 80 20 T 140 20"
                        fill="none"
                        stroke="#BC9751"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>

                  {/* Heart decoration above group */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>

                  {/* Sparkle decorations */}
                  <div className="absolute top-4 left-4 z-10 opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="absolute top-6 right-6 z-10 opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </>
              )}

              {/* Snap & Share card - Camera/photo style decorations */}
              {isSnapShare && (
                <>
                  {/* Camera icon decoration - center */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>

                  {/* Photo frame decorations */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    {/* Top left photo frame */}
                    <div className="absolute top-6 left-4 sm:top-8 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#BC9751]/30 to-[#F6E4CC]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[-8deg] shadow-md" />
                    {/* Top right photo frame */}
                    <div className="absolute top-8 right-5 sm:top-10 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-[#F6E4CC]/30 to-[#BC9751]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[12deg] shadow-md" />
                    {/* Bottom left photo frame */}
                    <div className="absolute bottom-10 left-5 sm:bottom-12 sm:left-7 w-7 h-7 sm:w-9 sm:h-9 md:w-13 md:h-13 bg-gradient-to-br from-[#BC9751]/30 to-[#F6E4CC]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[8deg] shadow-md" />
                    {/* Bottom right photo frame */}
                    <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 md:w-15 md:h-15 bg-gradient-to-br from-[#F6E4CC]/30 to-[#BC9751]/20 border-2 border-[#BC9751]/40 rounded-sm rotate-[-5deg] shadow-md" />
                  </div>

                  {/* Hashtag decoration */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="9" x2="20" y2="9"/>
                      <line x1="4" y1="15" x2="20" y2="15"/>
                      <line x1="10" y1="3" x2="8" y2="21"/>
                      <line x1="16" y1="3" x2="14" y2="21"/>
                    </svg>
                  </div>

                  {/* Share icon decoration */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 opacity-25 group-hover:opacity-40 transition-opacity duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </div>
                </>
              )}

              {/* RSVP card - Guest list/people style decorations */}
              {isRSVP && (
                <>
                  {/* Search icon decoration - top left */}
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>

                  {/* Guest list/people silhouettes - decorative group */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                    {/* Person 1 - Left */}
                    <div className="absolute bottom-12 left-8 sm:bottom-14 sm:left-10">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#F6E4CC]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 2 - Center Left */}
                    <div className="absolute bottom-10 left-1/3 sm:bottom-12">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 3 - Center */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 sm:bottom-14">
                      <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 text-[#F6E4CC]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 4 - Center Right */}
                    <div className="absolute bottom-10 right-1/3 sm:bottom-12">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    {/* Person 5 - Right */}
                    <div className="absolute bottom-12 right-8 sm:bottom-14 sm:right-10">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#F6E4CC]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Checkmark/confirmation icon - top right */}
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>

                  {/* Decorative connecting lines between people */}
                  <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-0 right-0 pointer-events-none z-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                    <svg className="w-full h-8" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M 30 20 Q 80 10, 130 20 T 230 20"
                        fill="none"
                        stroke="#BC9751"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>

                  {/* Heart decoration above group */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </>
              )}

              {/* Registry card - Gift/registry style decorations */}
              {isRegistry && (
                <>
                  {/* Gift box decoration - center */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#BC9751]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="8" width="18" height="13" rx="1" ry="1"/>
                      <path d="M12 8V3"/>
                      <path d="M8 3h8"/>
                      <path d="M12 8l-4-2"/>
                      <path d="M12 8l4-2"/>
                      <path d="M12 21v-8"/>
                    </svg>
                  </div>

                  {/* Ribbon decorations */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    {/* Top left ribbon */}
                    <div className="absolute top-6 left-4 sm:top-8 sm:left-6">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" opacity="0.3"/>
                        <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    {/* Top right ribbon */}
                    <div className="absolute top-8 right-5 sm:top-10 sm:right-8">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" opacity="0.3"/>
                        <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    {/* Bottom left ribbon */}
                    <div className="absolute bottom-10 left-5 sm:bottom-12 sm:left-7">
                      <svg className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" opacity="0.3"/>
                        <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    {/* Bottom right ribbon */}
                    <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-6">
                      <svg className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" opacity="0.3"/>
                        <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                  </div>

                  {/* Bow decoration - top center */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C10 2 8 3 8 5c0 2 2 3 4 3s4-1 4-3c0-2-2-3-4-3z" opacity="0.6"/>
                      <path d="M8 5c0 2 2 3 4 3s4-1 4-3M12 8v14M8 8l-2 2M16 8l2 2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                    </svg>
                  </div>

                  {/* Heart decoration - bottom center */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-25 group-hover:opacity-40 transition-opacity duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" opacity="0.4"/>
                    </svg>
                  </div>

                  {/* Sparkle decorations */}
                  <div className="absolute top-4 left-4 z-10 opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5"/>
                    </svg>
                  </div>
                  <div className="absolute top-6 right-6 z-10 opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5"/>
                    </svg>
                  </div>
                </>
              )}

              {/* Floral decorations - only for non-circular, non-gallery, non-messages, non-details, non-entourage, non-snapshare, non-rsvp, non-registry cards */}
              {!isFAQ && !isGallery && !isMessages && !isDetails && !isEntourage && !isSnapShare && !isRSVP && !isRegistry && (
                <>
                  {/* Top floral decoration - centered */}
                  <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <FloralDecoration className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" />
                  </div>

                  {/* Bottom floral decoration */}
                  <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rotate-180">
                    <FloralDecoration className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#BC9751]" />
                  </div>

                  {/* Right corner decoration */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#51181E]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2Z" fill="currentColor" opacity="0.3"/>
                      <circle cx="12" cy="10.5" r="1.5" fill="currentColor" opacity="0.4"/>
                    </svg>
                  </div>
                </>
              )}

              {/* Messages card - Envelope style with centered label */}
              {isMessages ? (
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                  {/* Label - Centered */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="text-[#F6E4CC] font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#FFFFFF] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                        textShadow: "0 2px 8px rgba(81, 24, 30, 0.6)",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                  </div>

                  {/* Copywriting - Centered and readable with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4">
                    <p
                      className="text-[#F6E4CC] font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                        textShadow: "0 1px 3px rgba(81, 24, 30, 0.5)",
                      }}
                    >
                      {card.copywriting}
                    </p>
                  </div>

                  {/* Invitation to view */}
                  <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#BC9751]/30 w-full">
                    <p
                      className="text-[#BC9751] font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#BC9751] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                        textShadow: "0 1px 2px rgba(81, 24, 30, 0.5)",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isDetails ? (
                /* Details card - Map style with centered label */
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                  {/* Label - Centered */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="text-[#51181E] font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#6D2028] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                        textShadow: "0 1px 3px rgba(246, 228, 204, 0.8)",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                  </div>

                  {/* Copywriting - Centered and readable with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4">
                    <p
                      className="text-[#51181E] font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-[#51181E] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                        color: '#2a1a0f',
                      }}
                    >
                      {card.copywriting}
                    </p>
                  </div>

                  {/* Invitation to view */}
                  <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#BC9751]/20 w-full">
                    <p
                      className="text-[#BC9751] font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#BC9751] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isEntourage ? (
                /* Entourage card - Group style with centered label */
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                  {/* Label - Centered */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#FFFFFF] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                        color: '#F6E4CC',
                        textShadow: "0 2px 6px rgba(81, 24, 30, 0.6), 0 1px 3px rgba(81, 24, 30, 0.4)",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#F6E4CC]/80 to-transparent" />
                  </div>

                  {/* Copywriting - Centered and readable with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4">
                    <p
                      className="font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                        color: '#F6E4CC',
                        textShadow: "0 2px 4px rgba(81, 24, 30, 0.5), 0 1px 2px rgba(81, 24, 30, 0.4)",
                      }}
                    >
                      {card.copywriting}
                    </p>
                  </div>

                  {/* Invitation to view */}
                  <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#F6E4CC]/40 w-full">
                    <p
                      className="font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                        color: '#F6E4CC',
                        textShadow: "0 1px 3px rgba(81, 24, 30, 0.5)",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isSnapShare ? (
                /* Snap & Share card - Centered label only */
                <div className="flex-1 flex flex-col relative z-10">
                  {/* Label - Absolutely centered in the card */}
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <h3
                        className="font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#FFFFFF] transition-colors duration-300 leading-tight"
                        style={{
                          fontFamily: "var(--font-serif)",
                          letterSpacing: "0.05em",
                          color: '#F6E4CC',
                          textShadow: "0 2px 6px rgba(81, 24, 30, 0.6), 0 1px 3px rgba(81, 24, 30, 0.4)",
                        }}
                      >
                        {card.label}
                      </h3>
                      {/* Decorative line under label */}
                      <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#F6E4CC]/80 to-transparent" />
                    </div>
                  </div>

                  {/* Invitation to view - Fixed at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 pt-3 sm:pt-4 md:pt-6 border-t border-[#F6E4CC]/40 w-full text-center">
                    <p
                      className="font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                        color: '#F6E4CC',
                        textShadow: "0 1px 3px rgba(81, 24, 30, 0.5)",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isRSVP ? (
                /* RSVP card - Guest list style with centered label */
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                  {/* Label - Centered */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#FFFFFF] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                        color: '#F6E4CC',
                        textShadow: "0 2px 6px rgba(81, 24, 30, 0.6), 0 1px 3px rgba(81, 24, 30, 0.4)",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#F6E4CC]/80 to-transparent" />
                  </div>

                  {/* Copywriting - Centered and readable with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4">
                    <p
                      className="font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                        color: '#F6E4CC',
                        textShadow: "0 2px 4px rgba(81, 24, 30, 0.5), 0 1px 2px rgba(81, 24, 30, 0.4)",
                      }}
                    >
                      {card.copywriting}
                    </p>
                  </div>

                  {/* Invitation to view */}
                  <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#F6E4CC]/40 w-full">
                    <p
                      className="font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#FFFFFF] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                        color: '#F6E4CC',
                        textShadow: "0 1px 3px rgba(81, 24, 30, 0.5)",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isGallery ? (
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                  {/* Label - Centered */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="text-[#51181E] font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#6D2028] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                        textShadow: "0 1px 3px rgba(246, 228, 204, 0.8)",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                  </div>

                  {/* Copywriting - Centered and readable with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4">
                    <p
                      className="text-[#51181E] font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-[#51181E] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                        color: '#2a1a0f',
                      }}
                    >
                      {card.copywriting}
                    </p>
                  </div>

                  {/* Invitation to view */}
                  <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#BC9751]/20 w-full">
                    <p
                      className="text-[#BC9751] font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#BC9751] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isRegistry ? (
                /* Registry card - Centered label only */
                <div className="flex-1 flex flex-col relative z-10">
                  {/* Label - Absolutely centered in the card */}
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <h3
                        className="font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[#6D2028] transition-colors duration-300 leading-tight"
                        style={{
                          fontFamily: "var(--font-serif)",
                          letterSpacing: "0.05em",
                          color: '#51181E',
                          textShadow: "0 1px 3px rgba(246, 228, 204, 0.8)",
                        }}
                      >
                        {card.label}
                      </h3>
                      {/* Decorative line under label */}
                      <div className="mt-2 sm:mt-3 mx-auto w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                    </div>
                  </div>

                  {/* Invitation to view - Fixed at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 pt-3 sm:pt-4 md:pt-6 border-t border-[#BC9751]/20 w-full text-center">
                    <p
                      className="font-sans font-medium text-[10px] sm:text-xs italic group-hover:text-[#BC9751] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontStyle: "italic",
                        color: '#BC9751',
                      }}
                    >
                      Click to view
                    </p>
                  </div>
                </div>
              ) : isFAQ ? (
                /* Circular card content for FAQ - Centered */
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-3 sm:px-4 md:px-5">
                  <h3
                    className="text-[#51181E] font-serif font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-[#6D2028] transition-colors duration-300 mb-3 sm:mb-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      letterSpacing: "0.05em",
                      textAlign: "center",
                      fontWeight: 600,
                      textShadow: "0 1px 3px rgba(246, 228, 204, 0.8)",
                    }}
                  >
                    {card.label}
                  </h3>
                  <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent mx-auto mb-3 sm:mb-4" />
                  <p
                    className="text-[#51181E] font-sans font-medium text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 group-hover:text-[#51181E] transition-colors duration-300 text-center"
                    style={{
                      fontFamily: "var(--font-sans)",
                      lineHeight: "1.8",
                      textAlign: "center",
                      fontWeight: 500,
                      textShadow: "0 1px 2px rgba(246, 228, 204, 0.6)",
                    }}
                  >
                    {card.copywriting}
                  </p>
                  <p
                    className="text-[#BC9751] font-sans font-semibold text-xs sm:text-sm italic group-hover:text-[#BC9751] transition-colors duration-300 text-center"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    Click to view
                  </p>
                </div>
              ) : (
                <>
                  {/* Label - Top Left */}
                  <div className="relative z-10 mb-3 sm:mb-4 md:mb-6">
                    <h3
                      className="text-[#51181E] font-serif font-light text-sm sm:text-base md:text-lg lg:text-xl group-hover:text-[#6D2028] transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {card.label}
                    </h3>
                    {/* Decorative line under label */}
                    <div className="mt-1.5 sm:mt-2 w-10 sm:w-12 md:w-16 h-px bg-gradient-to-r from-[#BC9751]/60 to-transparent" />
                  </div>

                  {/* Copywriting - Main Content with sans-serif */}
                  <div className="flex-1 flex flex-col justify-center relative z-10">
                    <p
                      className="text-[#51181E] font-sans font-normal text-[10px] sm:text-xs md:text-sm leading-relaxed mb-4 sm:mb-6 md:mb-8 group-hover:text-[#51181E] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-sans)",
                        lineHeight: "1.7",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {card.copywriting}
                    </p>

                    {/* Invitation to view */}
                    <div className="mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-[#BC9751]/20">
                      <p
                        className="text-[#BC9751] font-sans font-medium text-[10px] sm:text-xs italic text-center group-hover:text-[#BC9751] transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontStyle: "italic",
                        }}
                      >
                        Click to view
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Subtle hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                isMessages
                  ? 'from-[#BC9751]/0 via-[#BC9751]/0 to-[#BC9751]/0 group-hover:from-[#BC9751]/10 group-hover:via-[#BC9751]/15 group-hover:to-[#BC9751]/10'
                  : 'from-[#BC9751]/0 via-[#BC9751]/0 to-[#BC9751]/0 group-hover:from-[#BC9751]/5 group-hover:via-[#BC9751]/8 group-hover:to-[#BC9751]/5'
              }`} />
              
              {/* Elegant glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${
                isMessages
                  ? 'from-[#BC9751]/0 via-[#BC9751]/0 to-[#BC9751]/0 group-hover:from-[#BC9751]/20 group-hover:via-[#BC9751]/30 group-hover:to-[#BC9751]/20'
                  : 'from-[#BC9751]/0 via-[#BC9751]/0 to-[#BC9751]/0 group-hover:from-[#BC9751]/15 group-hover:via-[#BC9751]/25 group-hover:to-[#BC9751]/15'
              }`} />
            </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

