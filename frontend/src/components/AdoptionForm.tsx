import React, { useState } from 'react'
import { ArrowLeft, User, Mail, Phone, Home, MessageSquare } from 'lucide-react'
import { supabase, Pet } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

interface AdoptionFormProps {
  pet: Pet
  onClose: () => void
  onBack: () => void
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onClose, onBack }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: user?.email || '',
    phone: '',
    address: '',
    housing_type: '',
    has_yard: false,
    has_other_pets: false,
    other_pets_info: '',
    experience_with_pets: '',
    reason_for_adoption: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('adoption_applications')
        .insert({
          pet_id: pet.id,
          user_id: user?.id,
          ...formData
        })

      if (error) throw error

      setSuccess(true)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = 'checked' in e.target ? e.target.checked : false
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Application Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in adopting {pet.name}. We'll review your application and get back to you within 24-48 hours.
          </p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 p-6 border-b">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Adoption Application</h2>
          <p className="text-gray-600">for {pet.name}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 inline mr-1" />
              Full Name
            </label>
            <input
              type="text"
              name="applicant_name"
              value={formData.applicant_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="h-4 w-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Home className="h-4 w-4 inline mr-1" />
              Housing Type
            </label>
            <select
              name="housing_type"
              value={formData.housing_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select housing type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Street address, City, State, ZIP"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="has_yard"
              checked={formData.has_yard}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">I have a yard</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="has_other_pets"
              checked={formData.has_other_pets}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">I have other pets</label>
          </div>
        </div>

        {formData.has_other_pets && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tell us about your other pets
            </label>
            <textarea
              name="other_pets_info"
              value={formData.other_pets_info}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Types, ages, temperaments, etc."
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Experience with pets
          </label>
          <textarea
            name="experience_with_pets"
            value={formData.experience_with_pets}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Tell us about your experience with pets..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why do you want to adopt {pet.name}?
          </label>
          <textarea
            name="reason_for_adoption"
            value={formData.reason_for_adoption}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Share your reasons and what you're looking for in a pet..."
            required
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdoptionForm