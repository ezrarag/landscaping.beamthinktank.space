-- BEAM Landscaping Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'completed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  target_date DATE NOT NULL,
  volunteers_needed INTEGER DEFAULT 0,
  current_volunteers INTEGER DEFAULT 0,
  before_image TEXT,
  after_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Volunteers table
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  availability TEXT[] NOT NULL,
  experience TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('one-time', 'monthly')),
  project_id TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Requests table
CREATE TABLE service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_projects_created_at ON projects(created_at);

CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_city ON volunteers(city);
CREATE INDEX idx_volunteers_status ON volunteers(status);

CREATE INDEX idx_donations_email ON donations(email);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_stripe_id ON donations(stripe_payment_intent_id);

CREATE INDEX idx_service_requests_city ON service_requests(city);
CREATE INDEX idx_service_requests_status ON service_requests(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at 
  BEFORE UPDATE ON volunteers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at 
  BEFORE UPDATE ON donations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, description, location, status, progress, target_date, volunteers_needed, current_volunteers) VALUES
('Central Park Community Garden', 'Creating a sustainable community garden with native plants, walking paths, and educational signage.', 'New York, NY', 'active', 75, '2024-05-15', 10, 8),
('Riverside Park Restoration', 'Restoring native vegetation and creating wildlife habitats along the riverfront.', 'Los Angeles, CA', 'planning', 25, '2024-07-20', 15, 3),
('Downtown Plaza Greening', 'Transforming concrete spaces into green oases with seating areas and shade trees.', 'Chicago, IL', 'completed', 100, '2024-03-10', 20, 20);

-- Row Level Security (RLS) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Projects: Allow public read access, authenticated users can create
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects" ON projects FOR INSERT WITH CHECK (true);

-- Volunteers: Allow public read access, anyone can create volunteer records
CREATE POLICY "Volunteers are viewable by everyone" ON volunteers FOR SELECT USING (true);
CREATE POLICY "Anyone can create volunteer records" ON volunteers FOR INSERT WITH CHECK (true);

-- Donations: Allow public read access, anyone can create donation records
CREATE POLICY "Donations are viewable by everyone" ON donations FOR SELECT USING (true);
CREATE POLICY "Anyone can create donation records" ON donations FOR INSERT WITH CHECK (true);

-- Service Requests: Allow public read access, anyone can create service requests
CREATE POLICY "Service requests are viewable by everyone" ON service_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can create service requests" ON service_requests FOR INSERT WITH CHECK (true);
