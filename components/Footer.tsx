'use client'

import { motion } from 'framer-motion'
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ],
    services: [
      { name: 'Community Gardens', href: '/services/gardens' },
      { name: 'Urban Landscaping', href: '/services/urban' },
      { name: 'School Projects', href: '/services/schools' },
      { name: 'Volunteer Programs', href: '/volunteer' }
    ],
    resources: [
      { name: 'Project Gallery', href: '/gallery' },
      { name: 'Before & After', href: '/before-after' },
      { name: 'Educational Content', href: '/resources' },
      { name: 'Sustainability Tips', href: '/tips' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Donate', href: '/donate' },
      { name: 'Volunteer', href: '/volunteer' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-earth-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BEAM Landscaping</span>
              </Link>
              
              <p className="text-earth-300 mb-6 max-w-md">
                Transforming communities through beautiful, sustainable outdoor spaces. 
                We believe in the power of green spaces to bring people together and improve our environment.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-earth-300">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>123 Green Street, New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3 text-earth-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-earth-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>hello@beamlandscaping.org</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-earth-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-earth-800 pt-8 mb-8"
        >
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <p className="text-earth-300 mb-4">
              Get the latest news about our projects and volunteer opportunities.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-earth-800 border border-earth-700 rounded-lg text-white placeholder-earth-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary px-6">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-earth-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-earth-400 text-sm">
              © {currentYear} BEAM Landscaping. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-earth-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Legal Links */}
              <div className="flex items-center space-x-4 text-sm text-earth-400">
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
