"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { NavigationCards } from "@/components/navigation-cards"
import { EnvelopeIntro } from "@/components/envelope-intro"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

export default function Home() {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  useEffect(() => {
    // Check if envelope has been opened before (in this session)
    const hasOpenedEnvelope = sessionStorage.getItem("envelopeOpened") === "true"
    
    if (!hasOpenedEnvelope) {
      // Show envelope on first visit
      setShowEnvelope(true)
    } else {
      // If already opened, skip envelope and mark as opened
      setEnvelopeOpened(true)
    }
  }, [])

  const handleEnvelopeOpen = () => {
    // Mark envelope as opened in session storage
    sessionStorage.setItem("envelopeOpened", "true")
    setEnvelopeOpened(true)
    setShowEnvelope(false)
    
    // Trigger music to start playing
    // The BackgroundMusic component will detect this via sessionStorage
    sessionStorage.setItem("startMusic", "true")
  }

  return (
    <main className="relative">
      {/* Envelope Introduction Screen */}
      {showEnvelope && <EnvelopeIntro onOpen={handleEnvelopeOpen} />}

      {/* Main Content - Only show after envelope is opened */}
      {envelopeOpened && (
        <>
          {/* Silk Background Animation */}
          {enableDecor && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
                <Silk speed={5} scale={1.1} color="#6D2028" noiseIntensity={0.8} rotation={0.3} />
              </Suspense>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10">
            {/* Hero Section with New Copywriting */}
            <Hero />
            
            {/* Navigation Cards Grid */}
            <NavigationCards />
          </div>
        </>
      )}
    </main>
  )
}
