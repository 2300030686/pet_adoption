import React from 'react'
import { MapPin, Heart, DollarSign } from 'lucide-react'
import { Pet } from '../lib/supabase'

interface PetCardProps {
  pet: Pet
  onSelect: (pet: Pet) => void
}

const PetCard: React.FC<PetCardProps> = ({ pet, onSelect }) => {
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dog': return 'bg-blue-100 text-blue-800'
      case 'cat': return 'bg-purple-100 text-purple-800'
      case 'rabbit': return 'bg-green-100 text-green-800'
      case 'bird': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105">
      <div className="relative" onClick={() => onSelect(pet)}>
        <img
          src={pet.image_url || 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={pet.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(pet.species)}`}>
            {pet.species}
          </span>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      <div className="p-4" onClick={() => onSelect(pet)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
          {pet.adoption_fee && (
            <div className="flex items-center text-green-600 font-medium">
              <DollarSign className="h-4 w-4" />
              <span>{pet.adoption_fee}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-2">
          {pet.breed} • {pet.age} • {pet.gender}
        </p>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {pet.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {pet.personality?.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{pet.location}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(pet)
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default PetCard