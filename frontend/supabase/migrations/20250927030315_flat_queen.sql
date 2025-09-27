/*
  # Pet Adoption Website Database Schema

  1. New Tables
    - `pets`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `species` (text, not null - dog, cat, rabbit, bird, etc.)
      - `breed` (text)
      - `age` (text - puppy, adult, senior or specific age)
      - `size` (text - small, medium, large, extra_large)
      - `gender` (text - male, female)
      - `description` (text)
      - `medical_info` (text)
      - `personality` (text array)
      - `good_with_kids` (boolean, default false)
      - `good_with_pets` (boolean, default false)
      - `energy_level` (text - low, medium, high)
      - `adoption_fee` (numeric)
      - `location` (text)
      - `image_url` (text)
      - `is_adopted` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `adoption_applications`
      - `id` (uuid, primary key)
      - `pet_id` (uuid, foreign key)
      - `applicant_name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `address` (text, not null)
      - `housing_type` (text - house, apartment, condo, etc.)
      - `has_yard` (boolean, default false)
      - `has_other_pets` (boolean, default false)
      - `other_pets_info` (text)
      - `experience_with_pets` (text)
      - `reason_for_adoption` (text)
      - `status` (text, default 'pending' - pending, approved, rejected)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to pets
    - Add policies for authenticated users to submit applications
    - Add policies for admin management
*/

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  age text,
  size text,
  gender text,
  description text,
  medical_info text,
  personality text[],
  good_with_kids boolean DEFAULT false,
  good_with_pets boolean DEFAULT false,
  energy_level text,
  adoption_fee numeric,
  location text,
  image_url text,
  is_adopted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create adoption_applications table
CREATE TABLE IF NOT EXISTS adoption_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets(id) ON DELETE CASCADE,
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  housing_type text,
  has_yard boolean DEFAULT false,
  has_other_pets boolean DEFAULT false,
  other_pets_info text,
  experience_with_pets text,
  reason_for_adoption text,
  status text DEFAULT 'pending',
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pets
CREATE POLICY "Anyone can view available pets"
  ON pets
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert pets"
  ON pets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pets"
  ON pets
  FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for adoption_applications
CREATE POLICY "Users can view their own applications"
  ON adoption_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit adoption applications"
  ON adoption_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view all applications"
  ON adoption_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update application status"
  ON adoption_applications
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO pets (name, species, breed, age, size, gender, description, medical_info, personality, good_with_kids, good_with_pets, energy_level, adoption_fee, location, image_url) VALUES
('Buddy', 'dog', 'Golden Retriever', 'Adult (3 years)', 'large', 'male', 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He''s great with families and has been well-trained.', 'Up to date on vaccinations, neutered, microchipped', ARRAY['friendly', 'energetic', 'loyal', 'playful'], true, true, 'high', 250, 'San Francisco, CA', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800'),

('Luna', 'cat', 'Persian', 'Young Adult (2 years)', 'medium', 'female', 'Luna is a beautiful Persian cat with a calm and gentle personality. She loves to be pampered and enjoys quiet environments.', 'Spayed, vaccinated, litter trained', ARRAY['calm', 'gentle', 'affectionate', 'quiet'], true, false, 'low', 180, 'Los Angeles, CA', 'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=800'),

('Max', 'dog', 'German Shepherd', 'Adult (4 years)', 'large', 'male', 'Max is a loyal and intelligent German Shepherd. He''s protective of his family and would do best in a home with experienced dog owners.', 'Neutered, vaccinated, trained', ARRAY['loyal', 'intelligent', 'protective', 'trainable'], false, false, 'medium', 300, 'Austin, TX', 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=800'),

('Whiskers', 'cat', 'Maine Coon', 'Senior (8 years)', 'large', 'male', 'Whiskers is a gentle giant who loves to cuddle and purr. He''s perfect for someone looking for a calm, loving companion.', 'Neutered, vaccinated, senior health check completed', ARRAY['gentle', 'cuddly', 'calm', 'loving'], true, true, 'low', 120, 'Portland, OR', 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800'),

('Bella', 'dog', 'Labrador Mix', 'Young Adult (1.5 years)', 'medium', 'female', 'Bella is a sweet and energetic Labrador mix who loves outdoor adventures. She''s great with kids and other dogs.', 'Spayed, vaccinated, microchipped', ARRAY['sweet', 'energetic', 'adventurous', 'social'], true, true, 'high', 200, 'Denver, CO', 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800'),

('Oliver', 'cat', 'British Shorthair', 'Adult (3 years)', 'medium', 'male', 'Oliver is an independent but affectionate cat who enjoys both playtime and relaxation. Perfect for working professionals.', 'Neutered, vaccinated, microchipped', ARRAY['independent', 'affectionate', 'adaptable', 'easygoing'], true, true, 'medium', 160, 'Seattle, WA', 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=800');