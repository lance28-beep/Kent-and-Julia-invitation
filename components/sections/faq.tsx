"use client"

import { useState, useEffect } from "react"
import { ChevronDown, HelpCircle, Heart, Sparkles } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "Guests & Family: Semi-Formal attire is requested. We encourage our guests to dress according to our wedding colors. For ladies, white attire is reserved for the bride. Please refrain from wearing denim jeans, shorts, shirts and slippers.\n\nPrincipal Sponsors: For our beloved principal Sponsors, we kindly request to wear champagne long gowns and Barong Tagalog.",
  },
  {
    question: "When and where is the ceremony?",
    answer:
      "The ceremony will be held on January 2026 at 2:30 PM. Please arrive by 2:00 PM. The ceremony will take place at San Roque Parish, Cordova, Cebu, Philippines.",
  },
  {
    question: "Where is the reception?",
    answer:
      "The reception will be held at Privé by the Sea, Cebu, Philippines, starting at 6:00 PM. After Party begins at 10:00 PM.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please RSVP as soon as possible to help us finalize our guest list and make proper arrangements. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring additional guests?",
    answer:
      "Due to space and seating limitations, we kindly ask that only the guest/s listed on the invitation attend. This ensures a comfortable and enjoyable experience for everyone.",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "With all that we have, we are truly blessed. Your presence and prayers are all that we request, as our day is complete having you as a guest. But if you desire, nonetheless, a monetary gift is one we humbly request. You can use the GCash QR code available in the Gift Guide section.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Parking information will be provided closer to the event date. We recommend arriving early to secure a spot and allow time for parking.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer, but you're welcome to take photos! We'll have a dedicated time for group photos after the ceremony. Please use our official hashtag #Kenthelpfallinginlovewithjulia when sharing your photos.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section and submitting a new response.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      id="faq"
      className="relative min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Enhanced Section Header with Animation */}
      <div className={`relative z-10 text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6 px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
            Frequently Asked Questions
          </h2>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Everything you need to know
        </p>
      </div>

      {/* Enhanced FAQ content with Animation */}
      <div className={`relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        {/* Enhanced card with new color scheme */}
        <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 overflow-hidden group">
          {/* Enhanced glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          {/* Inner border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#BC9751]/30 rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* FAQ items */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 z-10">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border-2 border-[#BC9751]/40 bg-white/95 backdrop-blur-sm hover:bg-white hover:border-[#BC9751]/60 transition-all duration-300 hover:shadow-lg overflow-hidden group/item"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group/btn w-full px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#BC9751]/50 focus-visible:ring-offset-2 transition-all duration-300 hover:bg-[#BC9751]/5 rounded-t-lg sm:rounded-t-xl"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751] flex-shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <span className="font-bold text-[#51181E] pr-3 sm:pr-4 text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-relaxed group-hover/btn:text-[#6D2028] transition-colors duration-200">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-[#BC9751] flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#6D2028]" : ""} w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 bg-gradient-to-br from-[#BC9751]/15 to-[#BC9751]/5 border-t border-[#BC9751]/30 rounded-b-lg sm:rounded-b-xl">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#51181E] leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="/rsvp" 
                                className="text-[#6D2028] underline font-semibold hover:text-[#51181E] transition-colors"
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#51181E] leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg font-sans whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
