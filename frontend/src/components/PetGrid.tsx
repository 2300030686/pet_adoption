import React, { useState, useMemo } from 'react'
import { usePets } from '../hooks/usePets'
import PetCard from './PetCard'
import PetModal from './PetModal'
import SearchFilters, { FilterState } from './SearchFilters'
import { Pet } from '../lib/supabase'

const PetGrid: React.FC = () => {
  const { pets, loading, error } = usePets()
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    species: '',
    size: '',
    age: '',
    location: ''
  })

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const searchableText = `${pet.name} ${pet.breed} ${pet.description}`.toLowerCase()
        if (!searchableText.includes(searchTerm)) return false
      }

      // Species filter
      if (filters.species && pet.species !== filters.species) return false

      // Size filter
      if (filters.size && pet.size !== filters.size) return false

      // Age filter (simplified matching)
      if (filters.age) {
        const petAge = pet.age?.toLowerCase() || ''
        if (filters.age === 'puppy' && !petAge.includes('puppy') && !petAge.includes('kitten')) return false
        if (filters.age === 'young' && !petAge.includes('young')) return false
        if (filters.age === 'adult' && !petAge.includes('adult')) return false
        if (filters.age === 'senior' && !petAge.includes('senior')) return false
      }

      // Location filter
      if (filters.location) {
        const locationTerm = filters.location.toLowerCase()
        const petLocation = pet.location?.toLowerCase() || ''
        if (!petLocation.includes(locationTerm)) return false
      }

      return true
    })
  }, [pets, filters])

  if (loading) {
    return (
      <section id="pets" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading available pets...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="pets" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading pets: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pets" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Pets
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect companion from our amazing pets waiting for their forever homes
          </p>
        </div>

        <div className="mb-8">
          <SearchFilters onFiltersChange={setFilters} />
        </div>

        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {filters.search || filters.species || filters.size || filters.age || filters.location
                ? 'No pets found matching your criteria. Try adjusting your filters.'
                : 'No pets available at the moment. Please check back later.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredPets.length} of {pets.length} available pets
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onSelect={setSelectedPet}
                />
              ))}
            </div>
          </>
        )}

        <PetModal
          pet={selectedPet}
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      </div>
    </section>
  )
}

export default PetGrid