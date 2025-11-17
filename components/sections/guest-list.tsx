"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
    setIsVisible(true)
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    // Guest is always set to "1" - each name represents one guest
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: "1", // Always 1 guest per name
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    // Guest count is always 1, no validation needed

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? "1" : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestFormData,
          Guest: "1", // Always set to 1 guest per name
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <div id="guest-list" className="relative z-[60] isolate pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-visible">
      {/* Enhanced Section Header with Animation */}
      <div className={`relative z-10 text-center mb-8 sm:mb-10 md:mb-12 pt-4 sm:pt-6 px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tracking-wide">
            RSVP
          </h2>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#BC9751] fill-[#BC9751]/50 drop-shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BC9751] drop-shadow-lg animate-spin-slow" />
          <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#BC9751]/70 to-[#BC9751] animate-expand" style={{ animationDelay: '0.3s' }} />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-[#F6E4CC] font-sans max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Please search for your name below to confirm your attendance and help us prepare for this special celebration
        </p>
      </div>

      {/* Enhanced Search Section with Animation */}
      <div className={`relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        {/* Enhanced card with new color scheme */}
        <div className="relative bg-[#F6E4CC]/98 backdrop-blur-xl border-2 border-[#BC9751]/60 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-[0_25px_70px_rgba(188,151,81,0.5)] hover:border-[#BC9751]/80 transition-all duration-500 overflow-visible group" style={{ overflow: 'visible' }}>
          {/* Enhanced glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#BC9751]/20 via-[#BC9751]/10 to-[#51181E]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          {/* Inner border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#BC9751]/30 rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-[#51181E] to-[#6D2028] p-2 sm:p-2.5 rounded-xl shadow-lg">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFFFFF]" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-semibold text-[#51181E] font-sans mb-1">
                    Find Your Name
                  </label>
                  <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans">
                    Type as you search to see instant results
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative overflow-visible" style={{ zIndex: 50 }}>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#BC9751]/60 pointer-events-none transition-colors duration-200" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-sm sm:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 hover:border-[#BC9751]/50 focus:ring-2 focus:ring-[#BC9751]/20 bg-[#FFFFFF] shadow-inner focus:shadow-lg"
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-50 w-full mt-2 sm:mt-3 bg-[#F6E4CC]/95 backdrop-blur-lg border-2 border-[#BC9751]/40 rounded-xl shadow-2xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      zIndex: 50
                    }}
                  >
                    <div className="relative">
                      {filteredGuests.map((guest, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(guest)}
                          className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-left hover:bg-[#BC9751]/10 active:bg-[#BC9751]/20 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-b border-[#BC9751]/20 last:border-b-0 group"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="bg-gradient-to-br from-[#51181E] to-[#6D2028] p-1.5 sm:p-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFFFFF]" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm sm:text-base text-[#51181E] group-hover:text-[#6D2028] transition-colors duration-200 truncate">
                              {guest.Name}
                            </div>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="text-[10px] sm:text-xs text-[#51181E]/60 truncate mt-0.5">
                                {guest.Email}
                              </div>
                            )}
                          </div>
                          <div className="text-[#BC9751]/40 group-hover:text-[#BC9751] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-50 w-full mt-2 sm:mt-3 bg-[#F6E4CC]/95 backdrop-blur-lg border-2 border-[#BC9751]/40 rounded-xl shadow-2xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      zIndex: 50
                    }}
                  >
                    <div className="p-3 sm:p-4 md:p-5">
                      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="bg-gradient-to-br from-[#51181E] to-[#6D2028] p-1.5 sm:p-2 rounded-xl flex-shrink-0 shadow-md">
                          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFFFFF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm sm:text-base text-[#51181E] mb-1">Not finding your name?</h4>
                          <p className="text-xs sm:text-sm text-[#51181E]/70 font-sans leading-relaxed">
                            We'd love to have you with us! Send a request to join the celebration.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                        Request to Join
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 bg-[#F6E4CC] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border-2 border-[#BC9751]/40 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] p-2.5 sm:p-4 md:p-6 lg:p-8 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-white truncate">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-tight sm:leading-normal">
                      Hello <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-1 sm:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-3 sm:py-6 md:py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-3 sm:mb-4 md:mb-6">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600" />
                    </div>
                    <h4 className="text-base sm:text-xl md:text-2xl font-sans font-bold text-[#51181E] mb-2 sm:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#51181E]/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-2 font-sans">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-[#BC9751]/10 rounded-xl p-3 sm:p-4 md:p-6 border-2 border-[#BC9751]/30 space-y-2.5 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                            <span className="text-sm sm:text-base md:text-lg font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600" />
                            <span className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                        <div className="bg-[#BC9751]/10 rounded-lg p-2.5 sm:p-3 md:p-4 border-2 border-[#BC9751]/30">
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs md:text-sm text-[#51181E]/70 mb-0.5 sm:mb-1 font-medium font-sans">Number of Guests</p>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6D2028] font-sans">
                              {selectedGuest.Guest || "1"}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="pt-2 sm:pt-3 border-t border-[#BC9751]/20">
                          <p className="text-[10px] sm:text-xs md:text-sm text-[#51181E]/80 italic px-1 font-sans">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleCloseModal}
                      className="mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans font-semibold"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
                  >
                    {/* Can you attend? */}
                    <div>
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-4 font-sans">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                        <span className="leading-tight">Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                          className={`relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-[#BC9751]/30 bg-white hover:border-[#BC9751]/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                            <CheckCircle
                              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                                formData.RSVP === "Yes" ? "text-green-600" : "text-[#51181E]/40"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold font-sans ${
                                formData.RSVP === "Yes"
                                  ? "text-green-600"
                                  : "text-[#51181E]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-lg scale-105"
                              : "border-[#BC9751]/30 bg-white hover:border-[#BC9751]/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                            <XCircle
                              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#51181E]/40"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold font-sans ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#51181E]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Number of Guests - Hidden, always defaults to 1 */}

                    {/* Message to the couple */}
                    <div>
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans">
                        <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                        <span className="leading-tight">Your Message to the Couple</span>
                        <span className="text-[10px] sm:text-xs md:text-sm font-normal text-[#51181E]/60">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement..."
                        rows={3}
                        className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 resize-none bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans flex-wrap">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                        <span className="leading-tight">Your Email Address</span>
                        <span className="text-[10px] sm:text-xs md:text-sm font-normal text-[#51181E]/60">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 bg-white"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-3 md:pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] font-sans"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            <span className="text-xs sm:text-sm md:text-base">Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-xs sm:text-sm md:text-base">Submit RSVP</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Enhanced Success Overlay */}
              {success && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#51181E]/98 via-[#6D2028]/98 to-[#51181E]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FFFFFF]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FFFFFF] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#51181E]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                        <p className="text-[#FFFFFF]/95 text-sm sm:text-base md:text-lg font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-[#FFFFFF]/80 text-xs sm:text-sm md:text-base">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-[#FFFFFF]/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-[#FFFFFF]/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs md:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !success && (
                <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 bg-[#F6E4CC] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border-2 border-[#BC9751]/40 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] p-2.5 sm:p-4 md:p-6 lg:p-8 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-white truncate">
                        Request to Join
                      </h3>
                    </div>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base font-sans leading-tight sm:leading-normal">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                      ) : (
                        <>Want to celebrate with us? Send a request!</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                      <span className="leading-tight">Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans flex-wrap">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                      <span className="leading-tight">Email Address</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal text-[#51181E]/60">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans flex-wrap">
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                      <span className="leading-tight">Phone Number</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal text-[#51181E]/60">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 bg-white"
                    />
                  </div>

                  {/* Number of Guests - Hidden, always defaults to 1 */}

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-[#51181E] mb-1.5 sm:mb-2 md:mb-3 font-sans flex-wrap">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#BC9751] flex-shrink-0" />
                      <span className="leading-tight">Message</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal text-[#51181E]/60">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join..."
                      rows={3}
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-[#BC9751]/30 focus:border-[#BC9751] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#51181E]/40 transition-all duration-300 focus:ring-2 focus:ring-[#BC9751]/20 resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-3 md:pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#51181E] via-[#6D2028] to-[#51181E] hover:from-[#6D2028] hover:via-[#51181E] hover:to-[#6D2028] text-[#FFFFFF] py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] font-sans"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-xs sm:text-sm md:text-base">Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-xs sm:text-sm md:text-base">Send Request</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#51181E]/98 via-[#6D2028]/98 to-[#51181E]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FFFFFF]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FFFFFF] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#51181E]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
                      Request Sent!
                    </h4>
                    
                    {/* Message */}
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                      <p className="text-[#FFFFFF]/95 text-sm sm:text-base md:text-lg font-medium">
                        We've received your request
                      </p>
                      <p className="text-[#FFFFFF]/85 text-xs sm:text-sm md:text-base">
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs md:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !requestSuccess && (
                <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-sm sm:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
