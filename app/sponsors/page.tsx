import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BackButton } from "@/components/back-button"

export default function SponsorsPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#51181E] via-[#6D2028]/90 to-[#51181E]">
      <BackButton />
      <PrincipalSponsors />
    </main>
  )
}

