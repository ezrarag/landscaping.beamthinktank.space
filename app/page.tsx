'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Leaf, Users, Heart, Camera, Calendar, DollarSign } from 'lucide-react'
import CitySelector from '@/components/CitySelector'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BeforeAfterGallery from '@/components/BeforeAfterGallery'
import ProjectHighlights from '@/components/ProjectHighlights'
import VolunteerSignup from '@/components/VolunteerSignup'
import DonationSection from '@/components/DonationSection'

const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
]

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            BEAM Landscaping
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Transforming communities through beautiful, sustainable outdoor spaces. 
            Join us in making a difference, one landscape at a time.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <CitySelector 
              cities={cities}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn-primary bg-white text-primary-700 hover:bg-earth-100">
              Request Service
            </button>
            <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700">
              Volunteer Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-earth-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-earth-600 max-w-2xl mx-auto">
              From community gardens to urban renewal projects, we create sustainable 
              landscapes that bring people together and improve our environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainable Landscaping',
                description: 'Eco-friendly designs that conserve water and support local ecosystems.'
              },
              {
                icon: Users,
                title: 'Community Building',
                description: 'Bringing neighbors together through shared outdoor spaces and projects.'
              },
              {
                icon: Heart,
                title: 'Volunteer Programs',
                description: 'Opportunities for everyone to contribute to their community.'
              },
              {
                icon: Camera,
                title: 'Before & After',
                description: 'See the incredible transformations we\'ve achieved together.'
              },
              {
                icon: Calendar,
                title: 'Project Management',
                description: 'Professional planning and execution of landscaping initiatives.'
              },
              {
                icon: DollarSign,
                title: 'Transparent Funding',
                description: 'Clear tracking of donations and project costs.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-earth-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <BeforeAfterGallery />

      {/* Project Highlights */}
      <ProjectHighlights />

      {/* Volunteer Signup */}
      <VolunteerSignup />

      {/* Donation Section */}
      <DonationSection />

      <Footer />
    </div>
  )
}
