import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Book an Appointment</h1>
            <p className="text-lg text-muted-foreground">
              Schedule a consultation with our real estate experts at your convenience.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Online Appointment Booking</CardTitle>
              <CardDescription>
                Use the calendar below to select your preferred date and time for a consultation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Calendly Embed */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/example"
                style={{ minWidth: "320px", height: "630px" }}
              >
                <p>
                  <a href="https://calendly.com/example" target="_blank" rel="noopener noreferrer">
                    Click here to book an appointment
                  </a>
                </p>
              </div>
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>

              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <h3 className="font-bold text-foreground mb-2">Prefer to contact us directly?</h3>
                <p className="text-muted-foreground mb-4">
                  You can also reach out to us via phone or email to schedule an appointment.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+254700000000" className="text-primary hover:underline">
                      +254 700 000 000
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@joshina.com" className="text-primary hover:underline">
                      info@joshina.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
