import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Property } from './db'

// Helper to normalize Supabase property shape to match app's camelCase
function normalizeProperty(row: any): Property {
  return {
    id: String(row.id),
    title: row.title,
    description: row.description,
    type: row.type,
    price: row.price,
    location: row.location,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    area: row.square_footage || row.area || 0,
    images: row.images || [],
    features: row.features || [],

    createdAt: row.created_at ? new Date(row.created_at) : new Date(),
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  }
}

// Return a server-side Supabase client or null if env vars are not set.
export function getSupabaseClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase configuration. Please ensure:\n' +
      '1. You have a .env.local file in your project root\n' +
      '2. It contains SUPABASE_URL and SUPABASE_KEY\n' +
      `Current values: URL=${url ? 'set' : 'missing'}, KEY=${key ? 'set' : 'missing'}`
    )
  }

  return createClient(url, key)
}

// Create a new property in Supabase
export async function createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
  const supabase = getSupabaseClient()
  
  const { data: newProperty, error } = await supabase
    .from('properties')
    .insert([{
      title: data.title,
      description: data.description,
      type: data.type,
      price: data.price,
      location: data.location,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      square_footage: data.area,
      images: data.images,
      features: data.features,
    }])
    .select()
    .single()

  if (error) throw error
  if (!newProperty) throw new Error('Failed to create property')

  return normalizeProperty(newProperty)
}

// Helper: safe fetch from Supabase with fallback to mock data
export async function searchProperties(filters: {
  type?: 'sale' | 'rent' | 'land'
  location?: string
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
}): Promise<Property[]> {
  const supabase = getSupabaseClient()
  let query = supabase.from('properties').select('*')

  if (filters.type) query = query.eq('type', filters.type)
  if (filters.location) query = query.ilike('location', `%${filters.location}%`)
  if (typeof filters.minPrice === 'number') query = query.gte('price', filters.minPrice)
  if (typeof filters.maxPrice === 'number') query = query.lte('price', filters.maxPrice)
  if (typeof filters.minBedrooms === 'number') query = query.gte('bedrooms', filters.minBedrooms)

  const { data, error } = await query

  if (error) {
    console.error('Error searching properties:', error)
    throw error
  }

  return (data || []).map(normalizeProperty)
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching property by id:', error)
    throw error
  }

  return data ? normalizeProperty(data) : null
}

export async function deleteProperty(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    throw error;
  }

  return true;
}

// Add updateProperty if it's also missing
export async function updateProperty(id: string, data: Partial<Property>): Promise<Property> {
  const supabase = getSupabaseClient();
  
  const { data: updatedProperty, error } = await supabase
    .from('properties')
    .update(data)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating property:', error);
    throw error;
  }

  return normalizeProperty(updatedProperty);
}
