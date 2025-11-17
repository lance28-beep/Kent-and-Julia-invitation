"use client"

import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2, Sparkles } from "lucide-react"
import { siteConfig } from "@/content/site"

export function Footer() {
  const year = new Date().getFullYear()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  return (
    <footer 
      className="relative z-20 mt-16 text-[#F6E4CC] overflow-hidden bg-gradient-to-b from-[#51181E] via-[#6D2028] to-[#51181E]"
    >
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#6D2028]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-20 right-20 w-48 h-48 bg-[#BC9751]/12 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-[#6D2028]/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-10 w-44 h-44 bg-[#BC9751]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6D2028]/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BC9751]/15 to-transparent" />
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#6D2028]/8 via-[#BC9751]/5 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#6D2028]/8 via-[#BC9751]/5 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#6D2028]/8 via-[#BC9751]/5 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#6D2028]/8 via-[#BC9751]/5 to-transparent rounded-tl-3xl" />
      </div>
      
      {/* Top decorative divider */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/40 to-[#BC9751]/60" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]/70 animate-spin-slow" />
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]/80 fill-[#BC9751]/30 animate-pulse" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]/70 animate-spin-slow" style={{ animationDelay: '1s' }} />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/40 to-[#BC9751]/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" variants={fadeInUp} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-[#F6E4CC]/10 rounded-full border border-[#BC9751]/30">
                <Heart className="w-4 h-4 text-[#BC9751] fill-[#BC9751]/40" />
              </div>
              <h3 className="font-sans text-xl font-bold text-[#FFFFFF]">
                {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
              </h3>
            </div>
            <div className="space-y-1.5 text-[#F6E4CC]/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                <span>{siteConfig.wedding.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                <span>{siteConfig.wedding.time}</span>
              </div>
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <div className="bg-[#F6E4CC]/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#BC9751]/20">
              <h4 className="font-semibold text-[#FFFFFF] mb-2.5 flex items-center gap-2 text-sm font-sans">
                <div className="p-1 bg-[#F6E4CC]/10 rounded border border-[#BC9751]/30">
                  <Clock className="w-3.5 h-3.5 text-[#BC9751]" />
                </div>
                Ceremony
              </h4>
              <div className="space-y-1.5 text-[#F6E4CC]/90 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                  <span>{siteConfig.ceremony.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                  <span>{siteConfig.ceremony.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F6E4CC]/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#BC9751]/20">
              <h4 className="font-semibold text-[#FFFFFF] mb-2.5 flex items-center gap-2 text-sm font-sans">
                <div className="p-1 bg-[#F6E4CC]/10 rounded border border-[#BC9751]/30">
                  <Heart className="w-3.5 h-3.5 text-[#BC9751]" />
                </div>
                Reception
              </h4>
              <div className="space-y-1.5 text-[#F6E4CC]/90 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                  <span>{siteConfig.reception.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F6E4CC]/70" />
                  <span>{siteConfig.reception.time}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeInUp} className="relative">
            <h4 className="font-semibold text-[#FFFFFF] mb-4 text-sm flex items-center gap-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#BC9751]" />
              Follow Us
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <a 
                href="https://www.facebook.com/ann.manayon.9"
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#F6E4CC]/5 hover:bg-[#F6E4CC]/10 border border-[#BC9751]/20 hover:border-[#BC9751]/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#F6E4CC]" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#F6E4CC]/5 hover:bg-[#F6E4CC]/10 border border-[#BC9751]/20 hover:border-[#BC9751]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#F6E4CC]" />
              </a>
              <a 
                href="https://www.tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#F6E4CC]/5 hover:bg-[#F6E4CC]/10 border border-[#BC9751]/20 hover:border-[#BC9751]/40 transition-colors"
                aria-label="TikTok"
              >
                <Music2 className="w-4 h-4 text-[#F6E4CC]" />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#F6E4CC]/5 hover:bg-[#F6E4CC]/10 border border-[#BC9751]/20 hover:border-[#BC9751]/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-[#F6E4CC]" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-[#BC9751]/20 pt-6 mt-6" variants={fadeInUp}>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#BC9751]/30" />
            <Heart className="w-3 h-3 text-[#BC9751]/60 fill-[#BC9751]/20 animate-pulse" />
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#BC9751]/30" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <p className="text-[#F6E4CC]/80 text-xs font-sans">
              © {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}. All rights reserved.
            </p>
            <p className="text-[#F6E4CC]/70 text-xs flex items-center gap-1.5 font-sans">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#BC9751]/80 fill-[#BC9751]/40" />
              <span>for our special day</span>
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}


