-- Create properties table
create table properties (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  price numeric not null,
  type text not null check (type in ('sale', 'rent', 'land')),
  location text not null,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  area numeric not null default 0,
  images text[] not null default '{}',
  features text[] not null default '{}',
  address text not null,
  latitude numeric not null default 0,
  longitude numeric not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table properties enable row level security;

create policy "Enable read access for all users" on properties for select using (true);
create policy "Enable insert for authenticated users only" on properties for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on properties for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on properties for delete using (auth.role() = 'authenticated');

-- Sample data insert
insert into properties (
  title,
  description,
  price,
  type,
  location,
  bedrooms,
  bathrooms,
  area,
  images,
  features,
  address,
  latitude,
  longitude
) values
(
  'Modern 3-Bedroom Apartment',
  'Beautifully designed modern apartment with contemporary finishes, spacious living areas, and excellent natural lighting. Perfect for families or professionals.',
  8500000,
  'sale',
  'Eldoret CBD',
  3,
  2,
  150,
  array['/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800'],
  array['Modern finishes', 'Spacious living area', 'Natural lighting', 'Secure parking', 'Balcony'],
  '123 Main Street, Eldoret CBD, Eldoret',
  0.5143,
  35.2707
),
(
  'Spacious 4-Bedroom Villa',
  'Luxurious villa with premium finishes, large compound, and modern amenities. Ideal for families seeking comfort and space in a serene environment.',
  12000000,
  'sale',
  'Kapseret',
  4,
  3,
  250,
  array['/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800'],
  array['Large compound', 'Swimming pool', 'Modern kitchen', 'Home office', 'Garden', 'Security gate'],
  '456 Villa Lane, Kapseret, Eldoret',
  0.52,
  35.28
),
(
  'Commercial Space - Prime Location',
  'High-traffic commercial space ideal for retail, office, or mixed-use development. Located in the heart of Eldoret CBD with excellent visibility.',
  15000000,
  'sale',
  'Eldoret CBD',
  0,
  2,
  300,
  array['/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800'],
  array['High foot traffic', 'Ample parking', 'Modern facilities', 'Security system', 'Flexible layout'],
  '789 Commerce Street, Eldoret CBD, Eldoret',
  0.5143,
  35.2707
),
(
  'Residential Land Plot',
  'Prime residential land plot in a developing area with good infrastructure. Perfect for building your dream home.',
  3000000,
  'land',
  'Kapseret',
  0,
  0,
  500,
  array['/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800'],
  array['Prime location', 'Good road access', 'Flat terrain', 'Utilities nearby', 'Surveyed'],
  'Plot 500, Kapseret, Eldoret',
  0.525,
  35.285
),
(
  '3-Bedroom House for Rent',
  'Comfortable family home available for rent in a quiet residential area. Includes furnished kitchen and modern amenities.',
  45000,
  'rent',
  'Eldoret CBD',
  3,
  2,
  180,
  array['/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800', '/placeholder.svg?height=600&width=800'],
  array['Furnished kitchen', 'Modern amenities', 'Quiet area', 'Parking', 'Garden'],
  '654 Residential Street, Eldoret CBD, Eldoret',
  0.5143,
  35.2707
);