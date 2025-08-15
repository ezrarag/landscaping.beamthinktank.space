'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, MapPin, Clock, Heart } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface VolunteerForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  interests: string[]
  availability: string[]
  experience: string
  message: string
}

const interestOptions = [
  'Planting & Gardening',
  'Landscape Design',
  'Community Outreach',
  'Project Management',
  'Tool & Equipment',
  'Education & Training'
]

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Mornings',
  'Afternoons',
  'Evenings',
  'Flexible'
]

const experienceOptions = [
  'Beginner - No experience needed',
  'Some experience',
  'Experienced',
  'Professional'
]

export default function VolunteerSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<VolunteerForm>()

  const onSubmit = async (data: VolunteerForm) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Thank you for signing up! We\'ll be in touch soon.')
      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-earth-900 mb-6">
              Join Our Volunteer Team
            </h2>
            <p className="text-xl text-earth-600 mb-8">
              Make a difference in your community by volunteering with BEAM Landscaping. 
              No experience necessary - we provide training and support for all skill levels.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Community Impact',
                  description: 'Work alongside neighbors to create beautiful, sustainable spaces.'
                },
                {
                  icon: Calendar,
                  title: 'Flexible Commitment',
                  description: 'Volunteer when it works for you - no minimum time requirement.'
                },
                {
                  icon: MapPin,
                  title: 'Local Projects',
                  description: 'Focus on projects in your own neighborhood and city.'
                },
                {
                  icon: Clock,
                  title: 'Skill Building',
                  description: 'Learn landscaping techniques and environmental stewardship.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-900 mb-1">{benefit.title}</h3>
                    <p className="text-earth-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-earth-900">Volunteer Signup</h3>
              <p className="text-earth-600">Tell us about yourself and your interests</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="input-field"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="input-field"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="input-field"
                  placeholder="New York, NY"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Areas of Interest
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={interest}
                        {...register('interests')}
                        className="rounded border-earth-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-earth-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availabilityOptions.map((availability) => (
                    <label key={availability} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={availability}
                        {...register('availability')}
                        className="rounded border-earth-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-earth-700">{availability}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Experience Level
                </label>
                <select
                  {...register('experience')}
                  className="input-field"
                >
                  <option value="">Select experience level</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="input-field"
                  placeholder="Tell us why you'd like to volunteer or any specific questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    <span>Sign Up to Volunteer</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
