'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

interface BeforeAfterImage {
  id: number
  before: string
  after: string
  title: string
  description: string
  location: string
  date: string
}

const sampleImages: BeforeAfterImage[] = [
  {
    id: 1,
    before: '/api/placeholder/600/400/8B5A3F',
    after: '/api/placeholder/600/400/22C55E',
    title: 'Community Garden Transformation',
    description: 'Converted an abandoned lot into a thriving community garden with native plants and walking paths.',
    location: 'Brooklyn, NY',
    date: 'March 2024'
  },
  {
    id: 2,
    before: '/api/placeholder/600/400/78716C',
    after: '/api/placeholder/600/400/16A34A',
    title: 'Urban Park Renewal',
    description: 'Revitalized a neglected urban park with sustainable landscaping and community gathering spaces.',
    location: 'Los Angeles, CA',
    date: 'February 2024'
  },
  {
    id: 3,
    before: '/api/placeholder/600/400/57534E',
    after: '/api/placeholder/600/400/15803D',
    title: 'School Grounds Enhancement',
    description: 'Transformed school grounds with educational gardens and outdoor learning environments.',
    location: 'Chicago, IL',
    date: 'January 2024'
  },
  {
    id: 4,
    before: '/api/placeholder/600/400/44403C',
    after: '/api/placeholder/600/400/14532D',
    title: 'Neighborhood Beautification',
    description: 'Created a welcoming entrance to the neighborhood with native plants and sustainable design.',
    location: 'Houston, TX',
    date: 'December 2023'
  }
]

export default function BeforeAfterGallery() {
  const [selectedImage, setSelectedImage] = useState<BeforeAfterImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (image: BeforeAfterImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % sampleImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(sampleImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? sampleImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(sampleImages[prevIndex])
  }

  return (
    <section className="py-20 bg-earth-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-earth-900 mb-4">
            See the Transformation
          </h2>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            Witness the incredible before and after transformations of our landscaping projects. 
            Each image tells a story of community collaboration and environmental stewardship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sampleImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card cursor-pointer group hover:shadow-xl transition-all duration-300"
              onClick={() => openModal(image, index)}
            >
              <div className="relative mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <div className="aspect-video bg-earth-200 rounded-lg flex items-center justify-center">
                      <span className="text-earth-600 font-medium">Before</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-video bg-earth-200 rounded-lg flex items-center justify-center">
                      <span className="text-earth-600 font-medium">After</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-earth-600 mb-3">{image.description}</p>
              <div className="flex items-center justify-between text-sm text-earth-500">
                <span>{image.location}</span>
                <span>{image.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-primary">
            View All Projects
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-earth-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <div className="aspect-video bg-earth-200 rounded-lg flex items-center justify-center">
                      <span className="text-earth-600 font-medium">Before</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-video bg-earth-200 rounded-lg flex items-center justify-center">
                      <span className="text-earth-600 font-medium">After</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                
                <p className="text-earth-600 mb-4">{selectedImage.description}</p>
                <div className="flex items-center justify-between text-sm text-earth-500">
                  <span>{selectedImage.location}</span>
                  <span>{selectedImage.date}</span>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between p-6 border-t border-earth-200">
                <button
                  onClick={prevImage}
                  className="flex items-center space-x-2 text-earth-600 hover:text-primary-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <span className="text-earth-500">
                  {currentIndex + 1} of {sampleImages.length}
                </span>
                <button
                  onClick={nextImage}
                  className="flex items-center space-x-2 text-earth-600 hover:text-primary-600 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
