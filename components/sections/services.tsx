import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, TrendingUp, DollarSign, FileText } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Find your dream home or investment property with our expert guidance.",
    },
    {
      icon: TrendingUp,
      title: "Property Rentals",
      description: "Discover premium rental properties that match your lifestyle.",
    },
    {
      icon: DollarSign,
      title: "Property Valuation",
      description: "Get accurate valuations for your property from certified professionals.",
    },
    {
      icon: FileText,
      title: "Legal Support",
      description: "Navigate property transactions with our legal expertise and guidance.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon size={32} className="text-primary" />
                    </div>
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
