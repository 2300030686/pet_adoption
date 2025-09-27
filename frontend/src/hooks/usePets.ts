import { useState, useEffect } from 'react'
import { supabase, Pet } from '../lib/supabase'

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('is_adopted', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPets(data || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getPetById = async (id: string): Promise<Pet | null> => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching pet:', error)
      return null
    }
  }

  return {
    pets,
    loading,
    error,
    refetch: fetchPets,
    getPetById,
  }
}