'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Target, CheckCircle } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  location: string
  status: 'active' | 'completed' | 'planning'
  progress: number
  volunteers: number
  targetDate: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Central Park Community Garden',
    description: 'Creating a sustainable community garden with native plants, walking paths, and educational signage.',
    location: 'New York, NY',
    status: 'active',
    progress: 75,
    volunteers: 24,
    targetDate: 'May 2024',
    image: '/api/placeholder/400/300/22C55E'
  },
  {
    id: 2,
    title: 'Riverside Park Restoration',
    description: 'Restoring native vegetation and creating wildlife habitats along the riverfront.',
    location: 'Los Angeles, CA',
    status: 'planning',
    progress: 25,
    volunteers: 18,
    targetDate: 'July 2024',
    image: '/api/placeholder/400/300/16A34A'
  },
  {
    id: 3,
    title: 'Downtown Plaza Greening',
    description: 'Transforming concrete spaces into green oases with seating areas and shade trees.',
    location: 'Chicago, IL',
    status: 'completed',
    progress: 100,
    volunteers: 32,
    targetDate: 'March 2024',
    image: '/api/placeholder/400/300/15803D'
  }
]

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'planning':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-earth-100 text-earth-800'
  }
}

const getStatusIcon = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return <Target className="w-4 h-4" />
    case 'completed':
      return <CheckCircle className="w-4 h-4" />
    case 'planning':
      return <Calendar className="w-4 h-4" />
    default:
      return <Calendar className="w-4 h-4" />
  }
}

export default function ProjectHighlights() {
  return (
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
            Current Projects
          </h2>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            See what we're working on and how you can get involved. 
            Every project is an opportunity to make a difference in your community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative mb-4">
                <div className="aspect-video bg-earth-200 rounded-lg flex items-center justify-center">
                  <span className="text-earth-600 font-medium">Project Image</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-earth-600 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-earth-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-earth-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-earth-600">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-earth-600">
                  <Calendar className="w-4 h-4" />
                  <span>Target: {project.targetDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-earth-600">
                  <Users className="w-4 h-4" />
                  <span>{project.volunteers} volunteers</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {project.status === 'active' && (
                  <button className="btn-primary flex-1">
                    Join Project
                  </button>
                )}
                {project.status === 'planning' && (
                  <button className="btn-secondary flex-1">
                    Get Updates
                  </button>
                )}
                {project.status === 'completed' && (
                  <button className="btn-secondary flex-1">
                    View Results
                  </button>
                )}
                <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  Learn More
                </button>
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
    </section>
  )
}
