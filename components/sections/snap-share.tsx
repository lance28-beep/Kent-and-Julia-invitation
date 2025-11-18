"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Download, Camera, ArrowRight, Heart, Sparkles, QrCode, Upload } from "lucide-react"
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"
import { useRouter } from "next/navigation"

export function SnapShare() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const googleDriveUrl = "https://drive.google.com/drive/folders/18KE9csAk4bKDT1up17KWcB8exLOey3Mb?usp=drive_link"
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} 💕`

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div id="snap-share" className="relative min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Enhanced Header with Animation */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
              Snap & Share
            </h2>
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
            <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] border-2 border-[#BC9751]/60 hover:border-[#BC9751]/80 transition-all duration-500 group overflow-hidden"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced glow effects */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            
            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-[#51181E]" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-[#51181E]">
                    Help us Capture!
                  </h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[#51181E]/80 font-sans leading-relaxed mb-4 sm:mb-6">
                  Your presence made our celebration unforgettable. We'd love to see the moments you captured! Every smile, every laugh, every precious memory—we want to treasure them all. Scan the QR code below or click the button to upload your photos directly to our shared gallery. It's quick, easy, and secure!
                </p>
              </div>

              {/* QR Code Section for Google Drive Upload */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#BC9751]" />
                  <p className="text-xs sm:text-sm text-[#51181E]/75 font-sans text-center font-medium">
                    Scan to upload your photos instantly
                  </p>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative inline-flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#FFFFFF] via-[#F6E4CC] to-[#FFFFFF] rounded-xl sm:rounded-2xl shadow-xl border-2 border-[#BC9751]/50 group-hover:border-[#BC9751]/70 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    {/* Decorative corner accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#BC9751]/40 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#BC9751]/40 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#BC9751]/40 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#BC9751]/40 rounded-br-lg" />
                    {/* QR Code */}
                    <QRCodeSVG
                      value={googleDriveUrl}
                      size={isMobile ? 160 : 180}
                      level="H"
                      includeMargin={true}
                      fgColor="#51181E"
                      bgColor="#FFFFFF"
                      className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans text-center mb-4 sm:mb-6">
                  Point your camera at the QR code to open our photo upload folder. It's quick, easy, and secure!
                </p>
                
                {/* Upload Button */}
                <div className="text-center">
                  <a
                    href={googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/upload inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#BC9751] via-[#D4B87A] to-[#BC9751] hover:from-[#D4B87A] hover:via-[#BC9751] hover:to-[#D4B87A] text-[#51181E] rounded-xl font-sans font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#BC9751]/50 hover:border-[#BC9751]/80 relative overflow-hidden"
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover/upload:translate-y-[-2px]" />
                    <span className="relative z-10">Upload Photos to Google Drive</span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/upload:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover/upload:translate-x-full" />
                  </a>
                </div>
              </div>

              {/* Gallery Button */}
              <div className="text-center">
                <button
                  onClick={() => router.push("/gallery")}
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] rounded-xl font-sans font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#BC9751]/30 hover:border-[#BC9751]/60 relative overflow-hidden"
                >
                  <span className="relative z-10">View Gallery</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full" />
                </button>
                <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans mt-3 sm:mt-4">
                  See captured moments and upload your photos
                </p>
            </div>
            </div>
          </motion.div>

          <motion.div className="space-y-4 sm:space-y-6" variants={fadeInUp}>
            {/* QR Code Section */}
            <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] border-2 border-[#BC9751]/60 hover:border-[#BC9751]/80 transition-all duration-500 group overflow-hidden">
              {/* Enhanced glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
              
              <div className="relative z-10 text-center">
                <h4 className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#51181E] mb-4 sm:mb-6">Share Our Website</h4>
                <div className="mx-auto inline-flex flex-col items-center bg-white p-4 sm:p-5 rounded-xl shadow-md border-2 border-[#BC9751]/30 mb-4">
                  <div className="mb-3 p-2 rounded-xl bg-gradient-to-br from-[#BC9751]/20 via-white to-white ring-1 ring-[#BC9751]/40">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <QRCodeCanvas id="snapshare-qr" value={websiteUrl} size={isMobile ? 128 : 160} includeMargin className="bg-white" />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                    className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm bg-[#51181E] hover:bg-[#6D2028] text-white font-sans font-semibold"
                >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Download QR</span>
                </button>
              </div>
                <p className="font-sans text-xs sm:text-sm text-[#51181E]/70">Scan with any camera app</p>
              </div>
            </div>

            {/* Social Media Sharing */}
            <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] border-2 border-[#BC9751]/60 hover:border-[#BC9751]/80 transition-all duration-500 group overflow-hidden">
              {/* Enhanced glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

              <div className="relative z-10">
                <h5 className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#51181E] mb-4 sm:mb-6 text-center">Share on Social Media</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-medium text-xs sm:text-sm">Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-medium text-xs sm:text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/10"
                >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-medium text-xs sm:text-sm">TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-medium text-xs sm:text-sm">Twitter</span>
                </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-6 sm:mt-8 md:mt-12" variants={fadeInUp}>
          <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] border-2 border-[#BC9751]/60 hover:border-[#BC9751]/80 max-w-3xl mx-auto group overflow-hidden transition-all duration-500">
            {/* Enhanced glow effects */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            
            <div className="relative z-10">
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#51181E] leading-relaxed mb-4">
              We are so excited to celebrate our love with you! See you on our special day!
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="text-center">
                  <span className="block font-sans text-[#51181E] font-bold text-base sm:text-lg md:text-xl">– Kent & Julia –</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
