'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Target, Users, Leaf } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface DonationForm {
  amount: number
  frequency: 'one-time' | 'monthly'
  project: string
  firstName: string
  lastName: string
  email: string
  message: string
}

const donationAmounts = [25, 50, 100, 250, 500, 1000]
const projects = [
  'General Fund - Support all projects',
  'Community Gardens Initiative',
  'Urban Tree Planting Program',
  'School Grounds Enhancement',
  'Neighborhood Beautification',
  'Volunteer Training Program'
]

export default function DonationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DonationForm>()

  const handleAmountSelect = (amount: number) => {
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
  }

  const onSubmit = async (data: DonationForm) => {
    setIsSubmitting(true)
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast.success('Thank you for your donation! You will receive a confirmation email shortly.')
      reset()
      setCustomAmount('')
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-earth-800 to-earth-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Support Our Mission
          </h2>
          <p className="text-xl text-earth-200 max-w-2xl mx-auto">
            Your donation helps us create beautiful, sustainable landscapes and build stronger communities. 
            Every dollar makes a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">How Your Donation Helps</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Leaf,
                    title: 'Plant Native Species',
                    description: 'Purchase and plant native trees, shrubs, and flowers that support local ecosystems.'
                  },
                  {
                    icon: Users,
                    title: 'Train Volunteers',
                    description: 'Provide tools, safety equipment, and training for community volunteers.'
                  },
                  {
                    icon: Target,
                    title: 'Project Materials',
                    description: 'Buy soil, mulch, irrigation systems, and other landscaping materials.'
                  },
                  {
                    icon: Heart,
                    title: 'Community Programs',
                    description: 'Fund educational workshops and community engagement initiatives.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-earth-200 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Impact Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects Completed', value: '47', suffix: '+' },
                  { label: 'Volunteers', value: '1,200', suffix: '+' },
                  { label: 'Trees Planted', value: '3,500', suffix: '+' },
                  { label: 'Communities Served', value: '23', suffix: '+' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary-400 mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm text-earth-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 text-earth-900"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold">Make a Donation</h3>
              <p className="text-earth-600">Choose an amount and project to support</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-3">
                  Donation Amount *
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className="py-3 px-4 border border-earth-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center font-medium"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-500">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter custom amount"
                    className="input-field pl-8"
                    min="1"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-3">
                  Donation Frequency *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'one-time', label: 'One-time' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={option.value}
                        {...register('frequency', { required: 'Please select a frequency' })}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.frequency && (
                  <p className="text-red-500 text-sm mt-1">{errors.frequency.message}</p>
                )}
              </div>

              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Designate for Specific Project
                </label>
                <select
                  {...register('project')}
                  className="input-field"
                >
                  <option value="">Select a project (optional)</option>
                  {projects.map((project) => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
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
                  Message (Optional)
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="input-field"
                  placeholder="Share why you're donating or any specific message..."
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Complete Donation</span>
                  </>
                )}
              </button>

              <p className="text-xs text-earth-500 text-center">
                Your donation is secure and tax-deductible. You will receive a receipt via email.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
