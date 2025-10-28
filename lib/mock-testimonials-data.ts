// Mock testimonials data

export interface Testimonial {
  id: string
  name: string
  title: string
  company?: string
  content: string
  image: string
  rating: number
}

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Peter Kipchoge",
    title: "Property Investor",
    content:
      "Joshina International Properties helped me find the perfect investment property in Eldoret. Their team was professional, transparent, and guided me through every step of the process. Highly recommended!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "2",
    name: "Mary Kiplagat",
    title: "First-Time Home Buyer",
    content:
      "I was nervous about buying my first home, but the team at Joshina made the entire process smooth and stress-free. They answered all my questions and helped me find a home within my budget.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "3",
    name: "James Mwangi",
    title: "Business Owner",
    content:
      "Finding the right commercial space for my business was challenging until I worked with Joshina. They understood my needs and found the perfect location. Great service!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "4",
    name: "Elizabeth Kipchoge",
    title: "Property Owner",
    content:
      "I needed to sell my property quickly, and Joshina delivered results. Their marketing strategy was effective, and I received multiple offers within weeks. Excellent work!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "5",
    name: "Samuel Kiplagat",
    title: "Real Estate Investor",
    content:
      "The valuation service provided by Joshina was accurate and professional. They helped me understand the true value of my properties and make informed investment decisions.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]
