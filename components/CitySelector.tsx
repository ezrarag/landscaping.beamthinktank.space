'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronDown, Search } from 'lucide-react'

interface CitySelectorProps {
  cities: string[]
  selectedCity: string
  onCityChange: (city: string) => void
}

export default function CitySelector({ cities, selectedCity, onCityChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCitySelect = (city: string) => {
    onCityChange(city)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg px-4 py-3 text-left text-white placeholder-white/70 flex items-center justify-between hover:bg-white/30 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5" />
          <span className={selectedCity ? 'text-white' : 'text-white/70'}>
            {selectedCity || 'Select your city'}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-earth-200 z-50"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-earth-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-earth-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* City List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-3 text-left hover:bg-earth-50 transition-colors duration-150 flex items-center space-x-3"
                  >
                    <MapPin className="w-4 h-4 text-earth-400" />
                    <span className="text-earth-700">{city}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-earth-500 text-center">
                  No cities found
                </div>
              )}
            </div>

            {/* Popular Cities */}
            {!searchTerm && (
              <div className="p-3 border-t border-earth-200 bg-earth-50">
                <p className="text-sm text-earth-600 mb-2">Popular cities:</p>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(0, 5).map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleCitySelect(city)}
                      className="px-3 py-1 bg-white border border-earth-200 rounded-full text-sm text-earth-700 hover:bg-primary-50 hover:border-primary-300 transition-colors duration-150"
                    >
                      {city.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
