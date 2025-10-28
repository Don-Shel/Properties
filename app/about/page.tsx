import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockTeamMembers } from "@/lib/mock-team-data"
import { Award, Users, TrendingUp, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Client-Centric",
      description: "We prioritize our clients' needs and work tirelessly to exceed expectations.",
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Our team brings years of expertise and maintains the highest standards.",
    },
    {
      icon: TrendingUp,
      title: "Market Leadership",
      description: "We stay ahead of market trends and provide valuable insights to our clients.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "We're committed to contributing positively to the Eldoret community.",
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
              About Joshina International Properties
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Transforming the real estate landscape in Eldoret through professional service, transparency, and
              innovation.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Joshina International Properties was founded with a simple mission: to revolutionize real estate
                  services in Eldoret by combining professional expertise with genuine care for our clients.
                </p>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  What started as a small venture has grown into a trusted name in the Eldoret real estate market. We've
                  helped hundreds of families find their dream homes, investors discover profitable opportunities, and
                  businesses secure ideal locations.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we continue to innovate and expand our services, always keeping our clients' best interests at
                  the forefront of everything we do.
                </p>
              </div>
              <div className="h-96 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Joshina Properties Office"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide every decision we make and every interaction we have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon size={32} className="text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-center">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals dedicated to serving you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockTeamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-muted overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{member.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <strong>Specialties:</strong> {member.specialties.join(", ")}
                      </p>
                      <p className="text-muted-foreground">
                        <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                          {member.email}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get in touch with our team today and let us help you achieve your real estate goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
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
