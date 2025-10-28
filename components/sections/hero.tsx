import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Find Your Perfect Property in Eldoret
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Discover premium residential and commercial properties with expert guidance from Kenya's trusted real estate
            consultants.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>All Types</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Land</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>All Locations</option>
                  <option>Eldoret CBD</option>
                  <option>Kapseret</option>
                  <option>Langas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>Any Price</option>
                  <option>Under 5M</option>
                  <option>5M - 10M</option>
                  <option>10M+</option>
                </select>
              </div>
            </div>
            <Button asChild className="w-full shadow-md hover:shadow-lg transition-shadow">
              <Link href="/properties" className="flex items-center justify-center gap-2">
                <Search size={20} />
                Search Properties
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <Button asChild variant="outline" className="hover:bg-secondary transition-colors bg-transparent">
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button asChild className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
