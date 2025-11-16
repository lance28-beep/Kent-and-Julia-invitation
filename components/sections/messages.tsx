"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfDVnI_wLnK6A6phlO9w1M-aY5Dg3dnVOXASGADv0Mpifwnzw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-3 sm:px-4">
      {/* Enhanced decorative background elements */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#BC9751]/20 rounded-full blur-sm animate-pulse sm:w-8 sm:h-8 sm:-top-4 sm:-left-4"></div>
      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#BC9751]/15 rounded-full blur-md animate-pulse sm:w-12 sm:h-12 sm:-bottom-4 sm:-right-4"></div>
      
      <Card className={`relative w-full border-2 border-[#BC9751]/60 shadow-[0_12px_40px_rgba(81,24,30,0.35)] bg-[#F6E4CC]/98 backdrop-blur-xl transition-all duration-500 group overflow-hidden rounded-xl sm:rounded-2xl ${
        isFocused ? 'scale-[1.01] border-[#BC9751]/80 bg-[#F6E4CC] shadow-[0_16px_50px_rgba(81,24,30,0.45)]' : 'hover:bg-[#F6E4CC] hover:shadow-[0_16px_50px_rgba(81,24,30,0.4)]'
      } ${isSubmitted ? 'animate-bounce' : ''}`}>
        {/* Glass effect gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#51181E]/8 via-[#F6E4CC]/10 to-[#BC9751]/8"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6E4CC]/50 via-transparent to-transparent"></div>
        
        {/* Frosted glass effect */}
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#F6E4CC]/20 to-[#F6E4CC]/5"></div>
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BC9751]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#BC9751]/30 to-[#BC9751]/20 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#BC9751] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-[#FFFFFF]" />
              </div>
              <p className="text-[#51181E] font-sans font-semibold text-sm sm:text-base">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-4 sm:p-6 lg:p-8">
          {/* Header with icon */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BC9751]/30 to-[#BC9751]/20 rounded-full blur-lg scale-150"></div>
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#51181E] to-[#6D2028] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 text-[#FFFFFF]" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-sans font-bold text-[#51181E] mb-1 sm:mb-2">
              Share Your Love
            </h3>
            <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#51181E] font-sans flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-[#51181E]/20 to-[#BC9751]/15 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'name' ? 'scale-110 bg-[#BC9751]/30' : ''
                }`}>
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#51181E]" />
                </div>
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border-2 rounded-lg sm:rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 bg-[#FFFFFF] backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'name' 
                      ? 'border-[#BC9751] focus:border-[#BC9751] focus:ring-2 focus:ring-[#BC9751]/20 shadow-md' 
                      : 'border-[#BC9751]/30 hover:border-[#BC9751]/50'
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#BC9751] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-semibold text-[#51181E] font-sans flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-[#51181E]/20 to-[#BC9751]/15 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === 'message' ? 'scale-110 bg-[#BC9751]/30' : ''
                  }`}>
                    <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#51181E]" />
                  </div>
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-xs font-sans transition-colors ${
                    messageValue.length > 500 ? 'text-[#6D2028]' : 'text-[#51181E]/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`w-full border-2 rounded-lg sm:rounded-xl min-h-[90px] sm:min-h-[110px] text-sm sm:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 resize-none bg-[#FFFFFF] backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-2.5 sm:py-3 px-3 sm:px-4 ${
                    focusedField === 'message' 
                      ? 'border-[#BC9751] focus:border-[#BC9751] focus:ring-2 focus:ring-[#BC9751]/20 shadow-md' 
                      : 'border-[#BC9751]/30 hover:border-[#BC9751]/50'
                  }`}
                />
                {messageValue && (
                  <div className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#BC9751] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-sans font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-[#BC9751]/30"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BC9751]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Sending...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Send Message</span>
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzAC-mHVmj8XMqEDKeOPG4wP8Lr1AFWGUZWxWe2qFBsUjX0cGyZmF36C4ef1ZnJYeOY/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
    setIsVisible(true)
  }, [fetchMessages])

  return (
    <div className="relative min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating soft glows */}
          <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[#BC9751]/10 rounded-full blur-2xl animate-pulse" />
          <div className="hidden sm:block absolute top-10 right-0 w-20 h-20 bg-[#F6E4CC]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="hidden sm:block absolute bottom-10 left-10 w-28 h-28 bg-[#BC9751]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="sm:hidden absolute top-4 left-0 w-14 h-14 bg-[#BC9751]/10 rounded-full blur-lg" />
          <div className="sm:hidden absolute bottom-6 right-2 w-10 h-10 bg-[#F6E4CC]/10 rounded-full blur-md" />

          {/* Gradient lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BC9751]/25 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6E4CC]/20 to-transparent" />
        </div>
        
        {/* Enhanced Header Section with Animation */}
        <div className={`text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
              Love Messages
            </h2>
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
            <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#F6E4CC] mb-3 sm:mb-4 px-3 drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans leading-relaxed max-w-2xl mx-auto px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Your messages of love and joy will be treasured forever. 
              Share your memories, well wishes, and congratulations for the happy couple.
            </p>
          </div>
        </div>

        {/* Enhanced Form Section with Animation */}
        <div className={`flex justify-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="relative max-w-2xl w-full">
            {/* Enhanced Card halo */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-[#BC9751]/25 via-[#BC9751]/20 to-transparent rounded-2xl sm:rounded-3xl blur-2xl opacity-70 animate-pulse" />
            <div className="absolute -inset-2 bg-gradient-to-br from-[#BC9751]/15 via-transparent to-transparent rounded-2xl sm:rounded-3xl blur-xl opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Enhanced Messages Display Section with Animation */}
        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '400ms' }}>
          {/* Enhanced Top corner accents */}
          <div className="absolute -top-3 -left-3 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-[#BC9751] via-[#F6E4CC] to-[#FFFFFF] rounded-full blur-sm opacity-70 animate-pulse" />
          <div className="absolute -top-3 -right-3 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-bl from-[#BC9751] via-[#F6E4CC] to-[#FFFFFF] rounded-full blur-sm opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="relative inline-block mb-4 sm:mb-5">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#BC9751]/30 via-[#BC9751]/20 to-[#BC9751]/30 rounded-full blur-2xl scale-150 animate-pulse"></div>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#51181E] via-[#6D2028] to-[#51181E] rounded-full flex items-center justify-center mx-auto shadow-2xl border-2 border-[#BC9751]/30">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-[#FFFFFF] drop-shadow-lg" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 px-3 drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">
              Messages from Loved Ones
            </h3>
            <div className="h-px w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans max-w-2xl mx-auto px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </div>
  )
}
