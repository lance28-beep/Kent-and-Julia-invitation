"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Registry } from "@/components/sections/registry"
import { BackButton } from "@/components/back-button"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

export default function GiftsPage() {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

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

      {/* Content */}
      <div className="relative z-10 backdrop-blur-[0.5px]">
        <Registry />
      </div>
    </main>
  )
}

