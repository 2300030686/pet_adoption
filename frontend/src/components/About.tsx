import React from 'react'
import { Heart, Shield, Users, CheckCircle } from 'lucide-react'

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About PawFinder
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to connecting loving families with pets in need of homes. 
            Our mission is to ensure every pet finds their perfect match and every family finds their perfect companion.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-red-50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              To reduce pet homelessness by facilitating successful adoptions through 
              comprehensive screening, education, and ongoing support for both pets and their new families.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              All our pets are health-checked, vaccinated, and come with complete medical records.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Our team of animal experts provides guidance throughout the adoption process and beyond.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect Matches</h3>
            <p className="text-gray-600">
              We carefully match pets with families based on lifestyle, experience, and preferences.
            </p>
          </div>
        </div>

        {/* Adoption Process */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Our Adoption Process
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Browse Pets</h4>
              <p className="text-gray-600 text-sm">
                Explore our available pets and find ones that match your preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Apply Online</h4>
              <p className="text-gray-600 text-sm">
                Complete our adoption application with information about your home and lifestyle.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Meet & Greet</h4>
              <p className="text-gray-600 text-sm">
                Schedule a visit to meet your potential new family member in person.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Welcome Home</h4>
              <p className="text-gray-600 text-sm">
                Complete the adoption and welcome your new companion to their forever home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About