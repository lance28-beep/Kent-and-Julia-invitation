"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { BackButton } from "@/components/back-button"
import { Camera, Sparkles, Heart, Upload, QrCode } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackButton />
      
      {/* Silk Background Animation - Now the main background */}
      {enableDecor && (
        <div className="fixed inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#6D2028]" />}>
            <Silk speed={5} scale={1.1} color="#6D2028" noiseIntensity={0.8} rotation={0.3} />
          </Suspense>
        </div>
      )}

      {/* Subtle overlay for better text readability */}
      <div className="fixed inset-0 bg-[#6D2028]/20 pointer-events-none z-[1]" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24 backdrop-blur-[0.5px]">
        <div className="w-full max-w-4xl mx-auto">
          {/* Enhanced Header with Animation */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
                Gallery
              </h1>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#FFFFFF] font-sans font-light tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Share Your Precious Memories With Us
            </p>
          </div>

          {/* Enhanced Coming Soon Card */}
          <div className={`relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] transition-all duration-500 overflow-hidden group ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            {/* Enhanced glow effects */}
            <div className="absolute -inset-2 bg-gradient-to-br from-[#BC9751]/30 via-[#BC9751]/15 to-[#51181E]/15 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            
            {/* Animated inner border */}
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#BC9751]/40 rounded-lg sm:rounded-xl pointer-events-none group-hover:border-[#BC9751]/60 transition-colors duration-300" />
            
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#BC9751]/40 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#BC9751]/40 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#BC9751]/40 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#BC9751]/40 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card content */}
            <div className="relative p-8 sm:p-10 md:p-12 lg:p-14 z-10">
              <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12">
                {/* Enhanced Icon with multiple layers */}
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#BC9751]/30 to-[#51181E]/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                  {/* Middle glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#BC9751]/20 to-[#51181E]/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                  {/* Icon container */}
                  <div className="relative bg-gradient-to-br from-[#51181E] via-[#6D2028] to-[#51181E] p-5 sm:p-6 md:p-7 rounded-full shadow-2xl border-2 border-[#BC9751]/30 group-hover:border-[#BC9751]/60 transition-all duration-300 group-hover:scale-110">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#FFFFFF] drop-shadow-lg" />
                  </div>
                  {/* Floating sparkles */}
                  <Sparkles className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Enhanced Coming Soon Badge */}
                <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-br from-[#BC9751]/25 to-[#BC9751]/15 border-2 border-[#BC9751]/50 rounded-full shadow-lg group-hover:shadow-xl group-hover:border-[#BC9751]/70 transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#BC9751] animate-pulse" />
                  <span className="text-[#51181E] font-sans font-bold text-base sm:text-lg md:text-xl tracking-wide">
                    Coming Soon
                  </span>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#BC9751] animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Enhanced Main Message */}
                <div className="text-center space-y-5 sm:space-y-6 md:space-y-7">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#51181E] leading-tight drop-shadow-md">
                    Capture & Share Your Moments
                  </h2>
                  <div className="h-px w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-transparent via-[#BC9751]/60 to-transparent" />
                  <p className="text-base sm:text-lg md:text-xl text-[#51181E]/85 font-sans leading-relaxed max-w-2xl mx-auto">
                    Your presence made our celebration unforgettable. We'd love to see the moments you captured! Scan the QR code below or click the button to upload your photos directly to our shared gallery. Every smile, every laugh, every precious memory—we want to treasure them all.
                  </p>
                </div>

                {/* QR Code Section for Google Drive Upload */}
                <div className="w-full space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" />
                    <p className="text-sm sm:text-base md:text-lg text-[#51181E]/75 font-sans text-center font-medium">
                      Scan to upload your photos instantly
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative inline-flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#FFFFFF] via-[#F6E4CC] to-[#FFFFFF] rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#BC9751]/50 group-hover:border-[#BC9751]/70 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      {/* Decorative corner accents */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#BC9751]/40 rounded-tl-lg" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#BC9751]/40 rounded-tr-lg" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#BC9751]/40 rounded-bl-lg" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#BC9751]/40 rounded-br-lg" />
                      {/* QR Code */}
                      <QRCodeSVG
                        value="https://drive.google.com/drive/folders/18KE9csAk4bKDT1up17KWcB8exLOey3Mb?usp=drive_link"
                        size={200}
                        level="H"
                        includeMargin={true}
                        fgColor="#51181E"
                        bgColor="#FFFFFF"
                        className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px]"
                      />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans text-center max-w-md mx-auto">
                    Point your camera at the QR code to open our photo upload folder. It's quick, easy, and secure!
                  </p>
                </div>

                {/* Share Photos Button */}
                <a
                  href="https://drive.google.com/drive/folders/18KE9csAk4bKDT1up17KWcB8exLOey3Mb?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/share inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-[#BC9751] via-[#D4B87A] to-[#BC9751] hover:from-[#D4B87A] hover:via-[#BC9751] hover:to-[#D4B87A] text-[#51181E] rounded-xl sm:rounded-2xl font-sans font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#BC9751]/50 hover:border-[#BC9751]/80 relative overflow-hidden"
                >
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 group-hover/share:translate-y-[-2px]" />
                  <span className="relative z-10">Upload Photos to Google Drive</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/share:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover/share:translate-x-full" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


