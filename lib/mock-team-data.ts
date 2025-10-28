// Mock team member data

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  email: string
  phone: string
  specialties: string[]
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Joshua Kipchoge",
    title: "Founder & CEO",
    bio: "With over 15 years of experience in real estate, Joshua founded Joshina International Properties to bring professional and ethical real estate services to Eldoret. His vision is to make property investment accessible and transparent for everyone.",
    image: "/placeholder.svg?height=400&width=400",
    email: "joshua@joshina.com",
    phone: "+254 700 000 001",
    specialties: ["Commercial Real Estate", "Investment Strategy", "Market Analysis"],
  },
  {
    id: "2",
    name: "Grace Kiplagat",
    title: "Head of Sales",
    bio: "Grace brings 12 years of sales expertise and a deep understanding of the Eldoret market. She leads our sales team with a customer-first approach, ensuring every client finds their perfect property.",
    image: "/placeholder.svg?height=400&width=400",
    email: "grace@joshina.com",
    phone: "+254 700 000 002",
    specialties: ["Residential Sales", "Client Relations", "Negotiation"],
  },
  {
    id: "3",
    name: "David Mwangi",
    title: "Property Valuation Expert",
    bio: "David is a certified property valuer with 10 years of experience. He provides accurate and professional valuations for all property types, helping clients make informed decisions.",
    image: "/placeholder.svg?height=400&width=400",
    email: "david@joshina.com",
    phone: "+254 700 000 003",
    specialties: ["Property Valuation", "Market Assessment", "Investment Analysis"],
  },
  {
    id: "4",
    name: "Sarah Kipchoge",
    title: "Legal & Compliance Officer",
    bio: "Sarah ensures all transactions comply with Kenyan real estate laws and regulations. With her legal background, she protects our clients' interests throughout the buying and selling process.",
    image: "/placeholder.svg?height=400&width=400",
    email: "sarah@joshina.com",
    phone: "+254 700 000 004",
    specialties: ["Legal Compliance", "Contract Review", "Regulatory Affairs"],
  },
]
