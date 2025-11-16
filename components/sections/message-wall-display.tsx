"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-[#BC9751]/30 shadow-lg bg-[#F6E4CC]/95 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full" />
                  <div className="space-y-1.5 sm:space-y-2">
                    <Skeleton className="h-3 sm:h-4 w-20 sm:w-24 md:w-32" />
                    <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20 md:w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-12 sm:h-16 md:h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <div className="relative inline-block mb-4 sm:mb-6 md:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BC9751]/20 to-[#BC9751]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#51181E]/20 to-[#BC9751]/20 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#BC9751]" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-[#F6E4CC]/90 font-sans max-w-md mx-auto leading-relaxed">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[#BC9751]/70">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
            <span className="text-xs sm:text-sm font-sans text-[#F6E4CC]/85">Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border-2 border-[#BC9751]/40 shadow-[0_8px_32px_rgba(81,24,30,0.2)] bg-[#F6E4CC]/95 backdrop-blur-sm hover:shadow-[0_12px_40px_rgba(81,24,30,0.3)] transition-all duration-500 group overflow-hidden transform rounded-xl sm:rounded-2xl ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#51181E]/8 via-transparent to-[#BC9751]/12 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#51181E]/40 via-[#BC9751] to-[#51181E]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute -inset-[1px] rounded-xl sm:rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(188,151,81,0.15)' }} />
          
          <CardContent className="relative p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#51181E] to-[#6D2028] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-[#FFFFFF] font-sans text-xs sm:text-sm md:text-base font-semibold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#51181E]/30 to-[#BC9751]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-sans text-[#51181E] text-sm sm:text-base md:text-lg font-semibold truncate">{msg.name}</h4>
                  <span className="text-xs sm:text-sm text-[#51181E]/60 font-sans">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-2">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#51181E]/70 fill-[#51181E]/20 group-hover:fill-[#51181E]/40 group-hover:text-[#51181E] transition-all duration-300" />
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#BC9751]/70 group-hover:text-[#BC9751] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-0.5 -top-0.5 sm:-left-1 sm:-top-1 md:-left-2 md:-top-2 text-xl sm:text-2xl md:text-4xl text-[#51181E]/30 font-sans group-hover:text-[#51181E]/50 transition-colors duration-300">"</span>
              <p className="text-[#51181E]/90 text-xs sm:text-sm md:text-base leading-relaxed pl-3 sm:pl-4 md:pl-6 font-sans group-hover:text-[#51181E] transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 md:-right-2 md:-bottom-2 text-xl sm:text-2xl md:text-4xl text-[#51181E]/30 font-sans group-hover:text-[#51181E]/50 transition-colors duration-300">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-2 sm:mt-3 md:mt-4 flex justify-end">
              <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#BC9751]/40 to-transparent group-hover:via-[#BC9751]/60 transition-colors duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
