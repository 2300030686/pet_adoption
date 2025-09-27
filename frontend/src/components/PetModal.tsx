import React, { useState } from 'react'
import { X, MapPin, DollarSign, Heart, Check } from 'lucide-react'
import { Pet } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import AdoptionForm from './AdoptionForm'

interface PetModalProps {
  pet: Pet | null
  isOpen: boolean
  onClose: () => void
}

const PetModal: React.FC<PetModalProps> = ({ pet, isOpen, onClose }) => {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false)
  const { user } = useAuth()

  if (!isOpen || !pet) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {showAdoptionForm ? (
          <AdoptionForm 
            pet={pet} 
            onClose={() => setShowAdoptionForm(false)} 
            onBack={() => setShowAdoptionForm(false)}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <div className="space-y-4">
                  <img
                    src={pet.image_url || 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={pet.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{pet.location}</span>
                    </div>
                    {pet.adoption_fee && (
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>{pet.adoption_fee}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About {pet.name}</h3>
                    <p className="text-gray-700">{pet.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-900">Species:</span>
                      <p className="text-gray-700 capitalize">{pet.species}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Breed:</span>
                      <p className="text-gray-700">{pet.breed || 'Mixed'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Age:</span>
                      <p className="text-gray-700">{pet.age}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Size:</span>
                      <p className="text-gray-700 capitalize">{pet.size}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Gender:</span>
                      <p className="text-gray-700 capitalize">{pet.gender}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Energy Level:</span>
                      <p className="text-gray-700 capitalize">{pet.energy_level}</p>
                    </div>
                  </div>

                  {pet.personality && pet.personality.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personality</h4>
                      <div className="flex flex-wrap gap-2">
                        {pet.personality.map((trait, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Good with:</h4>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        {pet.good_with_kids ? (
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className="text-gray-700">Kids</span>
                      </div>
                      <div className="flex items-center">
                        {pet.good_with_pets ? (
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className="text-gray-700">Other Pets</span>
                      </div>
                    </div>
                  </div>

                  {pet.medical_info && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Medical Information</h4>
                      <p className="text-gray-700 text-sm">{pet.medical_info}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Save to Favorites</span>
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => user ? setShowAdoptionForm(true) : alert('Please sign in to apply for adoption')}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Apply to Adopt
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PetModal