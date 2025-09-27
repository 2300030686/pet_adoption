import React from 'react'
import { ArrowDown } from 'lucide-react'

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-red-500"> Companion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every pet deserves a loving home. Browse our available pets and start your adoption journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pets"
              className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Find Your Pet
            </a>
            <a
              href="#about"
              className="border-2 border-red-500 text-red-500 px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
            <div className="text-gray-600">Successful Adoptions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-gray-600">Available Pets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#pets"
            className="text-gray-400 hover:text-red-500 transition-colors animate-bounce"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero