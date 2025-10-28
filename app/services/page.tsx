import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, TrendingUp, DollarSign, FileText, MapPin, Users } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Find your dream property or sell your existing one with our expert guidance.",
      features: ["Property search assistance", "Market analysis", "Negotiation support", "Legal documentation"],
    },
    {
      icon: TrendingUp,
      title: "Property Rentals",
      description: "Discover premium rental properties or list your property for rent.",
      features: ["Tenant screening", "Lease management", "Maintenance coordination", "Rent collection"],
    },
    {
      icon: DollarSign,
      title: "Property Valuation",
      description: "Get accurate professional valuations for any property type.",
      features: ["Market analysis", "Comparative valuation", "Investment assessment", "Insurance valuation"],
    },
    {
      icon: FileText,
      title: "Legal Support",
      description: "Navigate property transactions with our legal expertise.",
      features: ["Contract review", "Compliance verification", "Title search", "Documentation support"],
    },
    {
      icon: MapPin,
      title: "Location Advisory",
      description: "Get insights on the best locations for your investment or lifestyle.",
      features: ["Market research", "Growth potential analysis", "Infrastructure assessment", "Demographic data"],
    },
    {
      icon: Users,
      title: "Investment Consulting",
      description: "Develop a winning investment strategy with our expert consultants.",
      features: ["Portfolio analysis", "Risk assessment", "ROI projections", "Market timing advice"],
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Comprehensive real estate solutions tailored to your needs. From buying and selling to investment
              consulting, we've got you covered.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We follow a proven process to ensure your satisfaction at every step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: "Consultation", description: "Understand your needs and goals" },
                { step: 2, title: "Analysis", description: "Research and market assessment" },
                { step: 3, title: "Execution", description: "Professional transaction handling" },
                { step: 4, title: "Support", description: "Ongoing assistance and follow-up" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our team today to discuss which service is right for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
